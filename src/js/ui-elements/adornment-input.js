import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Input, InputLabel, InputAdornment } from '@material-ui/core';

const AdornmentInput = props => (
  <FormControl className="form-control" error={Boolean(props.errors[`data.attributes.${props.name}`])}>
    <InputLabel>{props.label}</InputLabel>
    <Input
      name={props.name}
      className={props.className}
      autoFocus={props.autoFocus}
      value={props.editableModel.attributes[props.name] || ''}
      onChange={props.handleChange}
      onKeyUp={props.handleEnter}
      disabled={props.disabled}
      startAdornment={props.startAdornment ? <InputAdornment position="start">{props.startAdornment}</InputAdornment> : null}
      endAdornment={props.endAdornment ? <InputAdornment position="end">{props.endAdornment}</InputAdornment> : null}
    />
    {props.errors[`data.attributes.${props.name}`] ?
      <FormHelperText>{props.errors[`data.attributes.${props.name}`].detail}</FormHelperText>
      : ''}
  </FormControl>
);

AdornmentInput.defaultProps = {
  className: '',
  disabled: false,
  autoFocus: false,
  startAdornment: null,
  endAdornment: null,
};

AdornmentInput.propTypes = {
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

export default AdornmentInput;
