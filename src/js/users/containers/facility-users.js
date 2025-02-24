import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserList from './';
import {
  rolesGetNameById,
  ROLES_SUPER_ADMIN,
  ROLES_UPPER_MANAGEMENT,
  ROLES_ORGANIZATION_ADMIN,
  ROLES_FACILITY_ADMIN,
  ROLES_MASTER_USER,
  ROLES_ADMINISTRATOR,
} from '../../config/roles';

class FacilityUserList extends React.Component {
  constructor() {
    super();
    this.getUserRoles = this.getUserRoles.bind(this);
  }

  getUserRoles() {
    if (
      [ROLES_SUPER_ADMIN, ROLES_UPPER_MANAGEMENT, ROLES_ORGANIZATION_ADMIN]
        .includes(rolesGetNameById(this.props.journeyUser.attributes.role_id))
    ) {
      return [ROLES_FACILITY_ADMIN, ROLES_MASTER_USER, ROLES_ADMINISTRATOR];
    }
    return [ROLES_MASTER_USER, ROLES_ADMINISTRATOR];
  }

  render() {
    return (
      <UserList
        {...this.props}
        module="Users"
        userRoles={this.getUserRoles()}
        backButton={false}
        parentOrganizationId={parseInt(this.props.journeyUser.attributes.organization.id, 10)}
        parentFacilityId={parseInt(this.props.selectedFacility.id, 10)}
      />
    );
  }
}

FacilityUserList.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  selectedFacility: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authReducer, facilityReducer }) => ({
  journeyUser: authReducer.journeyUser,
  selectedFacility: facilityReducer.selectedFacility,
});

export default connect(
  mapStateToProps,
  null,
)(FacilityUserList);
