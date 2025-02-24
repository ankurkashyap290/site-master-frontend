import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel, InputAdornment, Input } from '@material-ui/core';

const NumericInput = props => (
  <FormControl className="form-control" error={Boolean(props.errors[`data.attributes.${props.name}`])}>
    <InputLabel>{props.label}</InputLabel>
    <Input
      name={props.name}
      className={props.className}
      autoFocus={props.autoFocus}
      value={props.editableModel.attributes[props.name] || ''}
      onChange={(event) => {
        props.handleChange({ target: { name: props.name, value: event.target.value } });
      }}
      onKeyUp={props.handleEnter}
      disabled={props.disabled}
      startAdornment={props.startAdornment ? <InputAdornment position="start">{props.startAdornment}</InputAdornment> : null}
      endAdornment={props.endAdornment ? <InputAdornment position="end">{props.endAdornment}</InputAdornment> : null}
      inputComponent={props.format}
    />
    {props.errors[`data.attributes.${props.name}`] ?
      <FormHelperText>{props.errors[`data.attributes.${props.name}`].detail}</FormHelperText>
      : ''}
  </FormControl>
);

NumericInput.defaultProps = {
  className: '',
  disabled: false,
  autoFocus: false,
  startAdornment: null,
  endAdornment: null,
};

NumericInput.propTypes = {
  format: PropTypes.func.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  label: PropTypes.string.isRequired,
  editableModel: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  startAdornment: PropTypes.string,
  endAdornment: PropTypes.string,
};

export default NumericInput;
