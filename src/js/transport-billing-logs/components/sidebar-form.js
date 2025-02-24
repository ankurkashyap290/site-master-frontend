import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'material-ui-pickers';
import { FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import dateformats from '../../config/dateformats';
import equipment from '../../config/equipment';
import transportType from '../../config/transport_type';
import TextInput from '../../ui-elements/text-input';
import SidebarForm from '../../ui-elements/sidebar-form';
import NumberFormatFee from '../../ui-elements/input-formats/number-format-fee';
import NumericInput from '../../ui-elements/numeric-input';
import NumberFormatMiles from '../../ui-elements/input-formats/number-format-miles';

const TransportBillingLogSidebarFormComponent = (props) => {
  if (!props.editableModel) {
    return null;
  }
  return (
    <SidebarForm {...props} >
      <TextInput {...props} name="location_name" label="Location Name" autoFocus />
      <TextInput {...props} name="client_name" label="Client Name" />
      <TextInput {...props} name="destination_type" label="Destination Type" helperText="Doctor’s Appointment, Hospital, Dialysis, etc." />
      <FormControl className="select">
        <InputLabel>Transport Type</InputLabel>
        <Select
          name="transport_type"
          value={props.editableModel.attributes.transport_type}
          onChange={props.handleChange}
        >
          {Object.keys(transportType).map(fieldName => (
            <MenuItem key={fieldName} value={fieldName}>{transportType[fieldName]}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="select">
        <InputLabel>Equipment Type</InputLabel>
        <Select
          name="equipment"
          value={props.editableModel.attributes.equipment}
          onChange={props.handleChange}
        >
          {Object.keys(equipment).map(fieldName => (
            <MenuItem key={fieldName} value={fieldName}>{equipment[fieldName]}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <NumericInput
        {...props}
        className="numeric-input"
        name="mileage_to_start"
        label="To Trip Destination Mileage: Start"
        endAdornment="mi"
        format={NumberFormatMiles}
      />
      <NumericInput
        {...props}
        className="numeric-input"
        name="mileage_to_end"
        label="To Trip Destination Mileage: End"
        endAdornment="mi"
        format={NumberFormatMiles}
      />
      <NumericInput
        {...props}
        className="numeric-input"
        name="mileage_return_start"
        label="Return Trip Destination Mileage: Start"
        endAdornment="mi"
        format={NumberFormatMiles}
      />
      <NumericInput
        {...props}
        className="numeric-input"
        name="mileage_return_end"
        label="Return Trip Destination Mileage: End"
        endAdornment="mi"
        format={NumberFormatMiles}
      />
      <NumericInput
        {...props}
        className="numeric-input"
        name="fee"
        label="Transport Fee"
        startAdornment="$"
        format={NumberFormatFee}
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          className="picker"
          keyboard
          label="Date"
          format={dateformats.dateFormat}
          mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
          value={props.editableModel.attributes.date}
          onChange={props.setDate}
          disableOpenOnEnter
        />
      </MuiPickersUtilsProvider>
    </SidebarForm>
  );
};

TransportBillingLogSidebarFormComponent.defaultProps = {
  editableModel: null,
};

TransportBillingLogSidebarFormComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  editableModel: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  changeSecured: PropTypes.func.isRequired,
};

export default TransportBillingLogSidebarFormComponent;
