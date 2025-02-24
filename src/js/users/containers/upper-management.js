import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserList from './';
import { ROLES_UPPER_MANAGEMENT } from '../../config/roles';

class UpperManagementList extends React.Component {
  render() {
    return (
      <UserList
        {...this.props}
        module="Upper Management"
        userRole={ROLES_UPPER_MANAGEMENT}
        backButton={false}
        parentOrganizationId={parseInt(this.props.journeyUser.attributes.organization.id, 10)}
      />
    );
  }
}

UpperManagementList.propTypes = {
  journeyUser: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
});

export default connect(
  mapStateToProps,
  null,
)(UpperManagementList);
