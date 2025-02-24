import React from 'react';
import PropTypes from 'prop-types';

import SidebarForm from 'ui-elements/sidebar-form';
import TextInput from 'ui-elements/text-input';
import NumericInput from 'ui-elements/numeric-input';

const OrganizationSidebarFormComponent = (props) => {
  if (!props.editableModel) {
    return null;
  }
  return (
    <SidebarForm {...props}>
      <TextInput {...props} name="name" label="Name" autoFocus />
      <NumericInput {...props} name="facility_limit" label="Facility Limit" />
    </SidebarForm>
  );
};

OrganizationSidebarFormComponent.defaultProps = {
  editableModel: null,
};

OrganizationSidebarFormComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  editableModel: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  journeyUser: PropTypes.object.isRequired,
};

export default OrganizationSidebarFormComponent;
