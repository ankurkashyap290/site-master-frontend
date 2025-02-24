import React from 'react';
import PropTypes from 'prop-types';

import SidebarForm from '../../ui-elements/sidebar-form';
import TextInput from '../../ui-elements/text-input';

const ClientSidebarFormComponent = (props) => {
  if (!props.editableModel) {
    return null;
  }
  return (
    <SidebarForm {...props}>
      <TextInput {...props} name="first_name" label="First Name" autoFocus />
      <TextInput {...props} name="middle_name" label="Middle Name" />
      <TextInput {...props} name="last_name" label="Last Name" />
      <TextInput {...props} name="room_number" label="Room #" />
      <TextInput {...props} name="responsible_party_email" label="Responsible Party Email" />
    </SidebarForm>
  );
};

ClientSidebarFormComponent.defaultProps = {
  editableModel: null,
};

ClientSidebarFormComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  editableModel: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
};

export default ClientSidebarFormComponent;
