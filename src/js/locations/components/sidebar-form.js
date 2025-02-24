import React from 'react';
import PropTypes from 'prop-types';
import states, { statesSuggestions } from 'locations/store/us-states';

import TextInput from 'ui-elements/text-input';
import SidebarForm from 'ui-elements/sidebar-form';
import AutosuggestInput from 'ui-elements/autosuggest-input';

const LocationSidebarFormComponent = (props) => {
  if (!props.editableModel) {
    return null;
  }
  return (
    <SidebarForm {...props} >
      <TextInput {...props} name="name" label="Name" autoFocus />
      <TextInput {...props} name="address" label="Address" />
      <TextInput {...props} name="city" label="City" />
      <AutosuggestInput
        suggestions={statesSuggestions}
        label="State"
        name="state"
        id={props.editableModel.attributes.state}
        value={states[props.editableModel.attributes.state]}
        onChange={props.handleChangeState}
        error={props.errors['data.attributes.state'] ?
        props.errors['data.attributes.state'] : {}}
      />
      <TextInput {...props} name="postcode" label="ZIP Code" />
      <TextInput {...props} name="phone" label="Phone" />
    </SidebarForm>
  );
};

LocationSidebarFormComponent.defaultProps = {
  editableModel: null,
};

LocationSidebarFormComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  editableModel: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeState: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
};

export default LocationSidebarFormComponent;
