import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'ui-elements/loader';

import OrganizationListComponent from '../components';
import { getOrganizationList, setEditableModel } from '../store/actions';
import { organizationSkeleton } from '../../store/skeletons';
import newOrderLogic from '../../common/new-order-logic';

class OrganizationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orderBy: 'name',
      order: 'asc',
    };
    this.props.setEditableModel(null);
    this.changePage = this.changePage.bind(this);
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
    this.setNewEditableModel = this.setNewEditableModel.bind(this);
  }

  componentDidMount() {
    this.props.getOrganizationList(
      0,
      this.state.orderBy,
      this.state.order,
    )
      .then(() => {
        this.setState({ loading: false });
      });
  }

  setNewEditableModel() {
    this.props.setEditableModel(Object.assign({}, organizationSkeleton));
  }

  changePage(event, page) {
    this.setState({ loading: true });
    this.props.getOrganizationList(
      page,
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
        this.props.getOrganizationList(
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
      <OrganizationListComponent
        modelList={this.props.modelList}
        modelListPagination={this.props.modelListPagination}
        orderBy={this.state.orderBy}
        order={this.state.order}
        handleChangeOrder={this.handleChangeOrder}
        onChangePage={this.changePage}
        setNewEditableModel={this.setNewEditableModel}
      />
    );
  }
}

OrganizationList.defaultProps = {
  modelList: [],
  modelListPagination: {},
};

OrganizationList.propTypes = {
  modelList: PropTypes.arrayOf(PropTypes.object),
  modelListPagination: PropTypes.object,
  setEditableModel: PropTypes.func.isRequired,
  getOrganizationList: PropTypes.func.isRequired,
};

const mapStateToProps = ({ organizationReducer }) => ({
  modelList: organizationReducer.modelList,
  modelListPagination: organizationReducer.modelListPagination,
});

const mapDispatchToProps = dispatch => ({
  getOrganizationList: (page, orderBy, order) =>
    dispatch(getOrganizationList(page, orderBy, order)),
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationList);
