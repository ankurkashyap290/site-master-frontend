import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BidListComponent from '../components';
import {
  getEvents,
  getPendingEvents,
  getInternalDrivers,
  getExternalDrivers,
} from '../store/actions';
import newOrderLogic from '../../common/new-order-logic';

class BidList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orderBy: 'datetime',
      order: 'desc',
      status: 'unassigned',
    };
    this.changePage = this.changePage.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
    this.loadEvents = this.loadEvents.bind(this);
  }

  componentWillMount() {
    const hash = this.props.location.hash.substr(1);
    if (['unassigned', 'pending', 'accepted'].includes(hash)) {
      this.setState({ status: hash });
    }
    this.loadEvents(hash);
    this.props.loadInternalDrivers();
    this.props.loadExternalDrivers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editableModel === null && this.props.editableModel !== null) {
      this.loadEvents();
    }
  }

  loadEvents(status) {
    const newStatus = status || this.state.status;
    this.setState({ loading: true });
    this.props.getEvents(
      newStatus,
      0,
      this.state.orderBy,
      this.state.order,
    )
      .then(() => this.props.getPendingEvents())
      .then(() => {
        this.setState({ loading: false });
      });
  }

  changeStatus(event, newStatus) {
    this.setState({ status: newStatus });
    this.loadEvents(newStatus);
  }

  changePage(event, page) {
    this.setState({ loading: true });
    this.props.getEvents(this.state.status, page)
      .then(() => this.setState({ loading: false }));
  }

  handleChangeOrder(orderBy) {
    this.setState(
      {
        orderBy,
        order: newOrderLogic(this.state.orderBy, orderBy, this.state.order),
      },
      () => {
        this.props.getEvents(
          this.state.status,
          this.props.modelListPagination.current_page - 1,
          this.state.orderBy,
          this.state.order,
        );
      },
    );
  }

  render() {
    return (
      <BidListComponent
        loading={this.state.loading}
        status={this.state.status}
        changeStatus={this.changeStatus}
        modelList={this.props.modelList}
        modelListPagination={this.props.modelListPagination}
        orderBy={this.state.orderBy}
        order={this.state.order}
        handleChangeOrder={this.handleChangeOrder}
        onChangePage={this.changePage}
      />
    );
  }
}

BidList.defaultProps = {
  editableModel: null,
};

BidList.propTypes = {
  location: PropTypes.object.isRequired,
  modelList: PropTypes.arrayOf(PropTypes.object).isRequired,
  modelListPagination: PropTypes.object.isRequired,
  editableModel: PropTypes.object,
  getEvents: PropTypes.func.isRequired,
  getPendingEvents: PropTypes.func.isRequired,
  loadInternalDrivers: PropTypes.func.isRequired,
  loadExternalDrivers: PropTypes.func.isRequired,
};

const mapStateToProps = ({ biddingReducer }) => ({
  modelList: biddingReducer.modelList,
  modelListPagination: biddingReducer.modelListPagination,
  pendingModelList: biddingReducer.pendingModelList,
  editableModel: biddingReducer.editableModel,
});

const mapDispatchToProps = dispatch => ({
  getEvents: (status, page, orderBy, order) =>
    dispatch(getEvents(status, page, orderBy, order)),
  getPendingEvents: () => dispatch(getPendingEvents()),
  loadInternalDrivers: () => dispatch(getInternalDrivers()),
  loadExternalDrivers: () => dispatch(getExternalDrivers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BidList);
