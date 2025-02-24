import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Button,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import states, { statesSuggestions } from 'locations/store/us-states';
import TextInput from 'ui-elements/text-input';
import AutosuggestInput from 'ui-elements/autosuggest-input';

const LocationInlineFormComponent = (props) => {
  if (!props.editableModel) {
    return null;
  }
  return (
    <Paper className="fieldset">
      <TextInput {...props} name="name" label="Location Name" />
      <div className="flex-row">
        <TextInput {...props} name="address" label="Address" />
        <AutosuggestInput
          suggestions={statesSuggestions}
          label="State"
          name="state"
          className="state"
          id={props.editableModel.attributes.state}
          value={states[props.editableModel.attributes.state]}
          onChange={props.handleChangeState}
          error={props.errors['data.attributes.state'] ?
          props.errors['data.attributes.state'] : {}}
        />
      </div>
      <div className="flex-row">
        <TextInput {...props} name="city" label="City" />
        <TextInput {...props} name="postcode" label="ZIP Code" />
      </div>
      <TextInput {...props} name="phone" label="Phone" />
      {props.showOneTime ?
        <FormControlLabel
          label="One Time Address"
          className="switch"
          control={
            <Switch
              onChange={props.changeOneTime}
              checked={Boolean(props.editableModel.attributes.one_time)}
              name="one_time"
              color="primary"
            />
          }
        /> : ''}
      <div className="button-container">
        <Button onClick={props.close} color="primary">Discard</Button>
        <Button onClick={props.handleSave} color="secondary" autoFocus>Save</Button>
      </div>
    </Paper>
  );
};

LocationInlineFormComponent.defaultProps = {
  editableModel: null,
};

LocationInlineFormComponent.propTypes = {
  editableModel: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  handleChangeState: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  changeOneTime: PropTypes.func.isRequired,
  showOneTime: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default LocationInlineFormComponent;
