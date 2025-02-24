import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'ui-elements/loader';

import ClientListComponent from '../components';
import {
  getClientList,
  setEditableModel,
  setSearchKey,
  setWarningMessage,
} from '../store/actions';
import { clientSkeleton } from '../../store/skeletons';
import newOrderLogic from '../../common/new-order-logic';

class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchLoading: false,
      orderBy: 'first_name',
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
    this.props.getClientList(
      0,
      this.props.searchKey,
      this.state.orderBy,
      this.state.order,
    )
      .then(() => {
        this.setState({ loading: false });
      });
  }

  componentWillReceiveProps() {
    this.setState({ searchLoading: false });
  }

  setNewEditableModel() {
    this.props.setEditableModel(Object.assign(
      {},
      clientSkeleton,
      {
        attributes: Object.assign(
          {},
          clientSkeleton.attributes,
          {
            facility_id: this.props.selectedFacility.id,
          },
        ),
      },
    ));
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
          this.setState({ searchLoading: true });
        }, 400),
      });
    }
  }

  changePage(event, page) {
    this.setState({ loading: true });
    const { searchKey } = this.props;
    this.props.getClientList(
      page,
      searchKey,
      this.state.orderBy,
      this.state.order,
    )
      .then(() => this.setState({ loading: false }));
  }

  handleChangeOrder(orderBy) {
    this.setState(
      {
        orderBy,
        order: newOrderLogic(this.state.orderBy, orderBy, this.state.order),
      },
      () => {
        this.props.getClientList(
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
      <ClientListComponent
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
        searchLoading={this.state.searchLoading}
        searchKey={this.props.searchKey}
        isImportDialogOpen={this.state.isImportDialogOpen}
        openImportDialog={this.openImportDialog}
        closeImportDialog={this.closeImportDialog}
      />
    );
  }
}

ClientList.defaultProps = {
  warningMessage: null,
  searchKey: '',
  setSearchKey: () => {},
};

ClientList.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  modelList: PropTypes.arrayOf(PropTypes.object).isRequired,
  modelListPagination: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  getClientList: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  searchKey: PropTypes.string,
  setSearchKey: PropTypes.func,
  resetSearch: PropTypes.func.isRequired,
  selectedFacility: PropTypes.object.isRequired,
  warningMessage: PropTypes.string,
  resetWarningMessage: PropTypes.func.isRequired,
};

const mapStateToProps = ({ clientReducer, facilityReducer, authReducer }) => ({
  journeyUser: authReducer.journeyUser,
  searchKey: clientReducer.searchKey,
  modelList: clientReducer.modelList,
  modelListPagination: clientReducer.modelListPagination,
  selectedFacility: facilityReducer.selectedFacility,
  warningMessage: clientReducer.warningMessage,
});

const mapDispatchToProps = dispatch => ({
  getClientList: (page, searchKey, orderBy, order) =>
    dispatch(getClientList(null, page, searchKey, orderBy, order)),
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  search: searchKey => dispatch(getClientList(null, 0, searchKey)),
  setSearchKey: searchKey => dispatch(setSearchKey(searchKey)),
  resetSearch: () => dispatch(getClientList),
  resetWarningMessage: () => dispatch(setWarningMessage(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientList);
