import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'ui-elements/loader';

import UserListComponent from '../components';
import {
  getUserList,
  setEditableModel,
  getParentOrganization,
  setUserRole,
  setUserRoles,
  setWarningMessage,
} from '../store/actions';
import { userSkeleton } from '../../store/skeletons';
import roles from '../../config/roles';
import newOrderLogic from '../../common/new-order-logic';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orderBy: 'first_name',
      order: 'asc',
    };
    this.props.setEditableModel(null);
    this.props.setUserRole(this.props.userRole);
    this.props.setUserRoles(this.props.userRoles);
    this.changePage = this.changePage.bind(this);
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
    this.setNewEditableModel = this.setNewEditableModel.bind(this);
  }

  componentDidMount() {
    this.props.getParentOrganization(this.props.parentOrganizationId).then(() => {
      this.props.getUserList(
        this.props.parentOrganizationId,
        this.props.parentFacilityId,
        this.getRoleIds(),
        0,
        this.state.orderBy,
        this.state.order,
      ).then(() => {
        this.setState({ loading: false });
      });
    });
  }

  getRoleIds() {
    if (this.props.userRole) {
      return roles[this.props.userRole];
    }
    return this.props.userRoles.map(role => roles[role]).join(',');
  }

  setNewEditableModel() {
    this.props.setEditableModel(Object.assign(
      {},
      userSkeleton,
      {
        attributes: Object.assign(
          {},
          userSkeleton.attributes,
          {
            organization: { id: this.props.parentOrganizationId },
            facility: { id: this.props.parentFacilityId },
            role_id: this.props.userRole ?
              roles[this.props.userRole] :
              roles[this.props.userRoles[0]],
          },
        ),
      },
    ));
  }

  changePage(event, page) {
    this.setState({ loading: true });
    this.props.getUserList(
      this.props.parentOrganizationId,
      this.props.parentFacilityId,
      this.getRoleIds(),
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
        this.props.getUserList(
          this.props.parentOrganizationId,
          this.props.parentFacilityId,
          this.getRoleIds(),
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
      <UserListComponent
        module={this.props.module}
        backButton={this.props.backButton}
        parentOrganization={this.props.parentOrganization}
        userRole={this.props.userRole}
        userRoles={this.props.userRoles}
        modelList={this.props.modelList}
        modelListPagination={this.props.modelListPagination}
        orderBy={this.state.orderBy}
        order={this.state.order}
        handleChangeOrder={this.handleChangeOrder}
        onChangePage={this.changePage}
        warningMessage={this.props.warningMessage}
        resetWarningMessage={this.props.resetWarningMessage}
        setNewEditableModel={this.setNewEditableModel}
      />
    );
  }
}

UserList.defaultProps = {
  backButton: true,
  parentFacilityId: null,
  userRole: null,
  userRoles: null,
  warningMessage: null,
};

UserList.propTypes = {
  module: PropTypes.string.isRequired,
  modelList: PropTypes.arrayOf(PropTypes.object).isRequired,
  modelListPagination: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  getUserList: PropTypes.func.isRequired,

  backButton: PropTypes.bool,
  parentOrganizationId: PropTypes.number.isRequired,
  getParentOrganization: PropTypes.func.isRequired,
  parentOrganization: PropTypes.object.isRequired,
  parentFacilityId: PropTypes.number,
  userRole: PropTypes.string,
  userRoles: PropTypes.array,
  setUserRole: PropTypes.func.isRequired,
  setUserRoles: PropTypes.func.isRequired,
  warningMessage: PropTypes.string,
  resetWarningMessage: PropTypes.func.isRequired,
};

const mapStateToProps = ({ userReducer }) => ({
  parentOrganization: userReducer.parentOrganization,
  modelList: userReducer.modelList,
  modelListPagination: userReducer.modelListPagination,
  warningMessage: userReducer.warningMessage,
});

const mapDispatchToProps = dispatch => ({
  getUserList: (organizationId, facilityId, roleIds, page, orderBy, order) =>
    dispatch(getUserList(organizationId, facilityId, roleIds, page, orderBy, order)),
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),

  getParentOrganization: id => dispatch(getParentOrganization(id)),
  setUserRole: userRole => dispatch(setUserRole(userRole)),
  setUserRoles: userRole => dispatch(setUserRoles(userRole)),
  resetWarningMessage: () => dispatch(setWarningMessage(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);
