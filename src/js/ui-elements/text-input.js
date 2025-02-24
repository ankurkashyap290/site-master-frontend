import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';

const TextInput = props => (
  <FormControl
    className="form-control"
    error={Boolean(props.errors[`data.attributes.${props.name}`])}
  >
    <InputLabel>{props.label}</InputLabel>
    <Input
      name={props.name}
      autoFocus={props.autoFocus}
      multiline={props.multiline}
      value={props.editableModel.attributes[props.name] || ''}
      onChange={props.handleChange}
      onKeyUp={props.multiline ? null : props.handleEnter}
      disabled={props.disabled}
    />
    {props.helperText ? <FormHelperText>{props.helperText}</FormHelperText>
      : ''}
    {props.errors[`data.attributes.${props.name}`] ?
      <FormHelperText>{props.errors[`data.attributes.${props.name}`].detail}</FormHelperText>
      : ''}
  </FormControl>
);

TextInput.defaultProps = {
  disabled: false,
  autoFocus: false,
  multiline: false,
  helperText: '',
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  multiline: PropTypes.bool,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  editableModel: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

export default TextInput;
