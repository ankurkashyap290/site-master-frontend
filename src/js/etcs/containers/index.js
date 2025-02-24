import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from 'ui-elements/loader';

import ETCListComponent from '../components';
import {
  getETCList,
  setEditableModel,
  setFacility,
  setWarningMessage,
} from '../store/actions';
import { etcSkeleton } from '../../store/skeletons';
import newOrderLogic from '../../common/new-order-logic';

class ETCList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orderBy: 'name',
      order: 'asc',
    };
    this.props.setEditableModel(null);
    this.props.setFacility(props.match.params.id);
    this.changePage = this.changePage.bind(this);
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
    this.setNewEditableModel = this.setNewEditableModel.bind(this);
  }

  componentDidMount() {
    this.props.getETCList(
      0,
      this.state.orderBy,
      this.state.order,
    )
      .then(() => {
        this.setState({ loading: false });
      });
  }

  setNewEditableModel() {
    this.props.setEditableModel(Object.assign({}, etcSkeleton));
  }

  changePage(event, page) {
    this.setState({ loading: true });
    this.props.getETCList(page)
      .then(() => this.setState({ loading: false }));
  }

  handleChangeOrder(orderBy) {
    this.setState(
      {
        orderBy,
        order: newOrderLogic(this.state.orderBy, orderBy, this.state.order),
      },
      () => {
        this.props.getETCList(
          this.props.modelListPagination.current_page - 1,
          this.state.orderBy,
          this.state.order,
        );
      },
    );
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <ETCListComponent
        modelList={this.props.modelList}
        modelListPagination={this.props.modelListPagination}
        orderBy={this.state.orderBy}
        order={this.state.order}
        handleChangeOrder={this.handleChangeOrder}
        onChangePage={this.changePage}
        setNewEditableModel={this.setNewEditableModel}
        warningMessage={this.props.warningMessage}
        resetWarningMessage={this.props.resetWarningMessage}
      />
    );
  }
}

ETCList.defaultProps = {
  warningMessage: null,
};

ETCList.propTypes = {
  modelList: PropTypes.arrayOf(PropTypes.object).isRequired,
  modelListPagination: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  getETCList: PropTypes.func.isRequired,
  setFacility: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  warningMessage: PropTypes.string,
  resetWarningMessage: PropTypes.func.isRequired,
};

const mapStateToProps = ({ etcReducer }) => ({
  modelList: etcReducer.modelList,
  modelListPagination: etcReducer.modelListPagination,
  getETCList: PropTypes.func.isRequired,
  warningMessage: etcReducer.warningMessage,
});

const mapDispatchToProps = dispatch => ({
  getETCList: (page, orderBy, order) => dispatch(getETCList(page, orderBy, order)),
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  setFacility: facilityId => dispatch(setFacility(facilityId)),
  resetWarningMessage: () => dispatch(setWarningMessage(null)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ETCList));
