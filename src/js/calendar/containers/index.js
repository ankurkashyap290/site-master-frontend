import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'ui-elements/loader';
import moment from 'moment';
import { uniqBy, cloneDeep } from 'lodash';

import CalendarComponent from '../components';
import {
  getEvents,
  setEditableModel,
  getModelFromList,
  setSearchKey,
  changeCalendarConfig,
  saveModel,
  deleteModel,
} from '../store/actions';
import { eventSkeleton } from '../../store/skeletons';
import {
  eventCollectionAdapter,
  calendarViewRangeAdapter,
  eventRecurrencesSorterAdapter,
  rruleFromStringAdapter,
  rruleToStringAdapter,
  eventToEditableAdapter,
} from '../store/adapters';
import newOrderLogic from '../../common/new-order-logic';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      contentLoading: false,
      orderBy: 'date',
      order: 'asc',
      activeTab: 0,
      searchResultPage: 0,
      isColorsOpen: false,
      typingTimeout: null,
      showSearchResult: false,
      isSearchSelectedAll: false,
      isSearchSelectedDeleteOpen: false,
      selectedSearchEvents: [],
    };

    this.printContent = null;
    this.todaysSchedule = [];
    this.props.setEditableModel(null);
    this.setNewEditableModel = this.setNewEditableModel.bind(this);
    this.setPrintContent = this.setPrintContent.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.navigateToDetails = this.navigateToDetails.bind(this);
    this.search = this.search.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.searchResultOnChangePage = this.searchResultOnChangePage.bind(this);
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
    this.searchResultOnSelect = this.searchResultOnSelect.bind(this);
    this.searchSelectAll = this.searchSelectAll.bind(this);
    this.onSearchSelectedDelete = this.onSearchSelectedDelete.bind(this);
    this.openSearchDeleteDialog = this.openSearchDeleteDialog.bind(this);
    this.closeSearchDeleteDialog = this.closeSearchDeleteDialog.bind(this);
    this.openColors = this.openColors.bind(this);
    this.closeColors = this.closeColors.bind(this);
  }

  componentDidMount() {
    this.resetSearch();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      contentLoading: false,
      selectedSearchEvents: [],
      isSearchSelectedAll: false,
      ...(this.props.searchKey.length === 0 ? { showSearchResult: false } : {}),
    });
    this.todaysSchedule = eventCollectionAdapter(nextProps.calendarEvents)
      .filter(item => moment(item.start).format('Y-MM-DD') === moment().format('Y-MM-DD'));
  }

  onSearchSelectedDelete() {
    const uniqueEvents = uniqBy(this.state.selectedSearchEvents, 'id')
      .map(de => this.props.calendarEvents.filter(ce => ce.id === de.id)[0]);
    let promise;

    uniqueEvents
      .forEach((e) => {
        const { recurrences } = e.attributes;

        if (recurrences.length > 1) {
          let event = cloneDeep(e);
          const rrule = rruleFromStringAdapter(event.attributes.rrule);
          rrule.options.count = null;
          rrule.options.until = moment().utc().toDate();
          event.attributes.rrule = rruleToStringAdapter(rrule);
          event = eventToEditableAdapter(event);
          promise = this.props.save(event)
            .then(() =>
              this.props.showDetails(null));
        } else {
          promise = this.props.delete(e.id);
        }
      });
    this.setState({ isSearchSelectedDeleteOpen: false });
    return promise;
  }

  setNewEditableModel() {
    this.props.setEditableModel(Object.assign(
      {},
      eventSkeleton,
      {
        attributes: Object.assign(
          {},
          eventSkeleton.attributes,
          {
            user_id: this.props.journeyUser.id,
            user: this.props.journeyUser.attributes,
            facility_id: this.props.selectedFacility.id,
          },
        ),
      },
    ));
  }

  setPrintContent(el) {
    if (this.printContent === null) {
      this.printContent = el;
      this.forceUpdate();
    }
  }

  navigateToDetails({ id, start }) {
    this.props.changeCalendarConfig({ date: moment(start).toDate() })
      .then(() => {
        this.setState(
          { contentLoading: true },
          this.changeTab(null, 0),
        );
      });
    this.props.showDetails(id);
  }

  openSearchDeleteDialog() {
    this.setState({ isSearchSelectedDeleteOpen: true });
  }

  closeSearchDeleteDialog() {
    this.setState({ isSearchSelectedDeleteOpen: false });
  }

  changeTab(event, value) {
    const { formatedStartDate, formatedEndDate } = calendarViewRangeAdapter(moment(), 'day');
    const facilityId = this.props.selectedFacility.id;

    this.setState({ activeTab: value });
    this.printContent = null;
    this.setState(
      { contentLoading: true },
      () => {
        if (value === 1) {
          this.props.getEvents(
            facilityId,
            {
              fromDate: formatedStartDate,
              toDate: formatedEndDate,
            },
          );
        } else {
          this.resetSearch();
        }
      },
    );
  }

  search(event) {
    const newSearchKey = event.target.value || '';
    const { typingTimeout } = this.state;
    event.persist();
    const facilityId = this.props.selectedFacility.id;

    this.props.setSearchKey(newSearchKey);

    if (newSearchKey.length > 2 || newSearchKey.length === 0) {
      if (typingTimeout !== null) {
        window.clearTimeout(typingTimeout);
        this.setState({ typingTimeout: null });
      }

      this.setState({
        typingTimeout: window.setTimeout(() => {
          if (newSearchKey.length) {
            this.props.search(facilityId, { searchKey: newSearchKey });
          } else {
            this.resetSearch();
          }
          this.setState({
            contentLoading: true,
            showSearchResult: true,
            searchResultPage: 0,
          });
        }, 400),
      });
    }
  }

  resetSearch() {
    const { date } = this.props.calendarConfig;
    const { formatedStartDate, formatedEndDate } = calendarViewRangeAdapter(moment(date), 'month');

    this.setState(
      { contentLoading: true },
      () => {
        this.props.resetSearch();
        this.props.getEvents(
          this.props.selectedFacility.id,
          {
            fromDate: formatedStartDate,
            toDate: formatedEndDate,
          },
        )
          .then(() => {
            this.setState({ loading: false, contentLoading: false });
          });
      },
    );
  }

  handleChangeOrder(orderBy) {
    this.setState({
      orderBy,
      order: newOrderLogic(this.state.orderBy, orderBy, this.state.order),
    });
  }

  openColors() {
    this.setState({ isColorsOpen: true });
  }

  closeColors() {
    this.setState({ isColorsOpen: false });
  }

  searchResultOnChangePage(event, page) {
    this.setState({ searchResultPage: page });
  }

  searchResultOnSelect({ checked }, event) {
    let { selectedSearchEvents } = this.state;

    if (checked) {
      selectedSearchEvents.push(event);
    } else {
      selectedSearchEvents = selectedSearchEvents
        .filter(e => !(e.id === event.id && moment(e.start).diff(moment(event.start)) === 0));
    }
    this.setState({ selectedSearchEvents });
  }

  searchSelectAll(events) {
    this.setState({
      selectedSearchEvents:
        !this.state.isSearchSelectedAll ?
          events.filter(e => !moment().isAfter(moment(e.start))) : [],
      isSearchSelectedAll: !this.state.isSearchSelectedAll,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    const { selectedSearchEvents } = this.state;
    const calendarConfig = Object.assign(
      {},
      this.props.calendarConfig,
      { events: eventCollectionAdapter(this.props.calendarEvents) },
    );
    return (
      <CalendarComponent
        calendarConfig={calendarConfig}
        orderBy={this.state.orderBy}
        order={this.state.order}
        handleChangeOrder={this.handleChangeOrder}
        setNewEditableModel={this.setNewEditableModel}
        search={this.search}
        searchKey={this.props.searchKey}
        contentLoading={this.state.contentLoading}
        resetSearch={this.resetSearch}
        searchSelectAll={this.searchSelectAll}
        selectedSearchEvents={selectedSearchEvents}
        isSearchSelectedAll={this.state.isSearchSelectedAll}
        onSearchSelectedDelete={this.onSearchSelectedDelete}
        isSearchSelectedDeleteOpen={this.state.isSearchSelectedDeleteOpen}
        openSearchDeleteDialog={this.openSearchDeleteDialog}
        closeSearchDeleteDialog={this.closeSearchDeleteDialog}
        showSearchResult={this.state.showSearchResult}
        searchResultPage={this.state.searchResultPage}
        searchResultOnChangePage={this.searchResultOnChangePage}
        searchResultOnSelect={this.searchResultOnSelect}
        showDetails={this.props.showDetails}
        navigateToDetails={this.navigateToDetails}
        activeTab={this.state.activeTab}
        changeTab={this.changeTab}
        selectedFacility={this.props.selectedFacility}
        isColorsOpen={this.state.isColorsOpen}
        openColors={this.openColors}
        closeColors={this.closeColors}
        printContent={this.printContent}
        setPrintContent={this.setPrintContent}
        todaysSchedule={
          eventRecurrencesSorterAdapter(this.todaysSchedule, this.state.orderBy, this.state.order)
        }
        searchResult={
          eventRecurrencesSorterAdapter(calendarConfig.events, this.state.orderBy, this.state.order)
        }
      />
    );
  }
}

Calendar.defaultProps = {
  searchKey: '',
  setSearchKey: () => {},
};

Calendar.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  calendarConfig: PropTypes.object.isRequired,
  calendarEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.func.isRequired,
  searchKey: PropTypes.string,
  setSearchKey: PropTypes.func,
  resetSearch: PropTypes.func.isRequired,
  selectedFacility: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  changeCalendarConfig: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer, calendarReducer, facilityReducer }) => ({
  journeyUser: authReducer.journeyUser,
  searchKey: calendarReducer.searchKey,
  calendarConfig: calendarReducer.calendarConfig,
  calendarEvents: calendarReducer.modelList,
  selectedFacility: facilityReducer.selectedFacility,
});

const mapDispatchToProps = dispatch => ({
  getEvents: (facilityId, filters) =>
    dispatch(getEvents(facilityId, filters)),
  search: (facilityId, filters) =>
    dispatch(getEvents(facilityId, filters)),
  setSearchKey: searchKey => dispatch(setSearchKey(searchKey)),
  resetSearch: () => dispatch(setSearchKey('')),
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  showDetails: id => dispatch(getModelFromList(id)),
  changeCalendarConfig: calendarConfig => dispatch(changeCalendarConfig(calendarConfig)),
  save: event => dispatch(saveModel(event)),
  delete: eventId => dispatch(deleteModel(eventId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar);
