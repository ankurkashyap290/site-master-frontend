import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import UserList from './';
import { ROLES_ORGANIZATION_ADMIN } from '../../config/roles';

class OrganizationAdminList extends React.Component {
  render() {
    return (
      <UserList
        {...this.props}
        module="Organization Admins"
        userRole={ROLES_ORGANIZATION_ADMIN}
        parentOrganizationId={parseInt(this.props.match.params.id, 10)}
      />
    );
  }
}

OrganizationAdminList.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(OrganizationAdminList);
