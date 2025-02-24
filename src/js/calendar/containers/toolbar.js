import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import ToolbarComponent from '../components/toolbar';
import { changeCalendarConfig } from '../store/actions';
import { eventCollectionAdapter } from '../store/adapters';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownAnchor: null,
      contentLoading: false,
    };

    this.dailySchedule = [];
    this.printContent = null;
    this.setPrintContent = this.setPrintContent.bind(this);
    this.changeCalendarConfig = this.changeCalendarConfig.bind(this);
    this.setView = this.setView.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToCurrent = this.goToCurrent.bind(this);
  }

  componentWillReceiveProps(props) {
    this.dailySchedule = eventCollectionAdapter(props.calendarEvents)
      .filter(event =>
        moment(event.start).format('Y-MM-DD') === moment(props.calendarConfig.date).format('Y-MM-DD'));
  }

  getStepUnit() {
    const { view } = this.props.calendarConfig;
    return view === 'agenda' ? 'month' : view;
  }

  setView(view) {
    this.changeCalendarConfig({ view });
    this.closeDropdown();
  }

  setPrintContent(el) {
    if (this.printContent === null) {
      this.printContent = el;
      this.forceUpdate();
    }
  }

  openDropdown(event) {
    this.setState({ dropdownAnchor: event.currentTarget });
  }

  closeDropdown() {
    this.setState({ dropdownAnchor: null });
  }

  goToPrev() {
    this.changeCalendarConfig({
      date: moment(this.props.calendarConfig.date).subtract(1, this.getStepUnit()).toDate(),
    });
  }

  goToNext() {
    this.changeCalendarConfig({
      date: moment(this.props.calendarConfig.date).add(1, this.getStepUnit()).toDate(),
    });
  }

  goToCurrent() {
    this.changeCalendarConfig({
      date: moment().toDate(),
    });
  }

  changeCalendarConfig(data) {
    this.setState({ contentLoading: true });
    this.props.changeCalendarConfig(data)
      .then(() => this.setState({ contentLoading: false }));
  }

  render() {
    return (
      <ToolbarComponent
        {...this.props}
        setView={this.setView}
        dropdownAnchor={this.state.dropdownAnchor}
        openDropdown={this.openDropdown}
        closeDropdown={this.closeDropdown}
        contentLoading={this.state.contentLoading}
        printContent={this.printContent}
        setPrintContent={this.setPrintContent}
        goToPrev={this.goToPrev}
        goToNext={this.goToNext}
        goToCurrent={this.goToCurrent}
        calendarEvents={this.dailySchedule}
      />
    );
  }
}

Toolbar.propTypes = {
  date: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,

  calendarConfig: PropTypes.object.isRequired,
  calendarEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeCalendarConfig: PropTypes.func.isRequired,
};

const mapStateToProps = ({ calendarReducer, facilityReducer }) => ({
  calendarConfig: calendarReducer.calendarConfig,
  calendarEvents: calendarReducer.modelList,
  selectedFacility: facilityReducer.selectedFacility,
});

const mapDispatchToProps = dispatch => ({
  changeCalendarConfig: calendarConfig => dispatch(changeCalendarConfig(calendarConfig)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toolbar);
