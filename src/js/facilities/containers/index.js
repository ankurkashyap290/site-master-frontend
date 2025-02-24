import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'ui-elements/loader';

import FacilityListComponent from '../components';
import { getFacilityList, setEditableModel } from '../store/actions';
import { facilitySkeleton } from '../../store/skeletons';
import newOrderLogic from '../../common/new-order-logic';

class FacilityList extends React.Component {
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
    const organizationId = parseInt(this.props.journeyUser.attributes.organization.id, 10);
    this.props
      .getFacilityList(
        organizationId,
        0,
      )
      .then(() => {
        this.setState({ loading: false });
      });
  }

  setNewEditableModel() {
    this.props.setEditableModel(Object.assign(
      {},
      facilitySkeleton,
      {
        attributes: Object.assign(
          {},
          facilitySkeleton.attributes,
          { organization_id: parseInt(this.props.journeyUser.attributes.organization.id, 10) },
        ),
      },
    ));
  }

  changePage(event, page) {
    this.setState({ loading: true });
    const organizationId = parseInt(this.props.journeyUser.attributes.organization.id, 10);
    this.props.getFacilityList(
      organizationId,
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
        this.props.getFacilityList(
          parseInt(this.props.journeyUser.attributes.organization.id, 10),
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
      <FacilityListComponent
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

FacilityList.defaultProps = {
  modelList: [],
  modelListPagination: {},
};

FacilityList.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  modelList: PropTypes.arrayOf(PropTypes.object),
  modelListPagination: PropTypes.object,
  setEditableModel: PropTypes.func.isRequired,
  getFacilityList: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer, facilityReducer }) => ({
  journeyUser: authReducer.journeyUser,
  modelList: facilityReducer.modelList,
  modelListPagination: facilityReducer.modelListPagination,
});

const mapDispatchToProps = dispatch => ({
  getFacilityList: (organizationId, page, orderBy, order) =>
    dispatch(getFacilityList(organizationId, page, orderBy, order)),
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityList);
