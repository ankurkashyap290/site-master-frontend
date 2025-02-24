import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'ui-elements/loader';

import { getLocationList, setEditableModel, setSearchKey } from 'locations/store/actions';
import LocationListComponent from '../components';
import { locationSkeleton } from '../../store/skeletons';
import { setWarningMessage } from '../store/actions';
import newOrderLogic from '../../common/new-order-logic';

class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataLoading: false,
      orderBy: 'name',
      order: 'asc',
      isImportDialogOpen: false,
      typingTimeout: null,
    };
    this.props.setEditableModel(null);
    this.search = this.search.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
    this.setNewEditableModel = this.setNewEditableModel.bind(this);
    this.openImportDialog = this.openImportDialog.bind(this);
    this.closeImportDialog = this.closeImportDialog.bind(this);
  }

  componentDidMount() {
    this.props.resetSearch();
    this.props.getLocationList(
      0,
      null,
      this.state.orderBy,
      this.state.order,
    )
      .then(() => {
        this.setState({ loading: false });
      });
  }

  componentWillReceiveProps() {
    this.setState({ dataLoading: false });
  }

  setNewEditableModel() {
    this.props.setEditableModel(Object.assign({}, locationSkeleton));
  }

  search(event) {
    const newSearchKey = event.target.value;
    const { typingTimeout } = this.state;

    event.persist();
    this.props.setSearchKey(newSearchKey);

    if (newSearchKey.length > 2 || newSearchKey.length === 0) {
      if (typingTimeout !== null) {
        window.clearTimeout(typingTimeout);
        this.setState({ typingTimeout: null });
      }

      this.setState({
        typingTimeout: window.setTimeout(() => {
          this.props.search(newSearchKey);
          this.setState({ dataLoading: true });
        }, 400),
      });
    }
  }

  changePage(event, page) {
    const { searchKey } = this.props;
    this.setState({ loading: true });
    this.props.getLocationList(page, searchKey)
      .then(() => this.setState({ loading: false }));
  }

  handleChangeOrder(orderBy) {
    this.setState(
      {
        orderBy,
        order: newOrderLogic(this.state.orderBy, orderBy, this.state.order),
      },
      () => {
        this.props.getLocationList(
          this.props.modelListPagination.current_page - 1,
          this.props.searchKey,
          this.state.orderBy,
          this.state.order,
        );
      },
    );
  }

  openImportDialog() {
    this.setState({ isImportDialogOpen: true });
  }

  closeImportDialog() {
    this.setState({ isImportDialogOpen: false });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <LocationListComponent
        journeyUser={this.props.journeyUser}
        modelList={this.props.modelList}
        modelListPagination={this.props.modelListPagination}
        orderBy={this.state.orderBy}
        order={this.state.order}
        handleChangeOrder={this.handleChangeOrder}
        onChangePage={this.changePage}
        warningMessage={this.props.warningMessage}
        resetWarningMessage={this.props.resetWarningMessage}
        setNewEditableModel={this.setNewEditableModel}
        search={this.search}
        searchKey={this.props.searchKey}
        searchLoading={this.state.dataLoading}
        isImportDialogOpen={this.state.isImportDialogOpen}
        openImportDialog={this.openImportDialog}
        closeImportDialog={this.closeImportDialog}
      />
    );
  }
}

LocationList.defaultProps = {
  warningMessage: null,
  searchKey: '',
  setSearchKey: () => {},
};

LocationList.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  modelList: PropTypes.arrayOf(PropTypes.object).isRequired,
  modelListPagination: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  getLocationList: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  searchKey: PropTypes.string,
  setSearchKey: PropTypes.func,
  resetSearch: PropTypes.func.isRequired,
  warningMessage: PropTypes.string,
  resetWarningMessage: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer, locationReducer }) => ({
  journeyUser: authReducer.journeyUser,
  searchKey: locationReducer.searchKey,
  modelList: locationReducer.modelList,
  modelListPagination: locationReducer.modelListPagination,
  warningMessage: locationReducer.warningMessage,
});

const mapDispatchToProps = dispatch => ({
  getLocationList: (page, searchKey, orderBy, order) =>
    dispatch(getLocationList(null, page, searchKey, orderBy, order)),
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  search: searchKey => dispatch(getLocationList(null, 0, searchKey)),
  setSearchKey: searchKey => dispatch(setSearchKey(searchKey)),
  resetSearch: () => dispatch(setSearchKey('')),
  resetWarningMessage: () => dispatch(setWarningMessage(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationList);
