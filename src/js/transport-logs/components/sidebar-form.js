import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'material-ui-pickers';
import TimePicker from 'ui-elements/TimePicker';
import { Switch, FormControlLabel, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import equipment from 'config/equipment';
import dateformats from 'config/dateformats';
import TextInput from 'ui-elements/text-input';
import SidebarForm from 'ui-elements/sidebar-form';

const TransportLogSidebarFormComponent = (props) => {
  if (!props.editableModel) {
    return null;
  }
  return (
    <SidebarForm {...props} >
      <TextInput {...props} name="location_name" label="Location Name" autoFocus />
      <TextInput {...props} name="client_name" label="Client Name" />
      <TextInput {...props} name="signature" label="Digital Signature" />
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
      <FormControlLabel
        label="Equipment secured"
        className="switch"
        control={
          <Switch
            onChange={props.changeSecured}
            checked={Boolean(props.editableModel.attributes.equipment_secured)}
            name="equipment_secured"
            color="primary"
          />
        }
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
      <TimePicker
        label="Return Time"
        format={dateformats.timeFormat}
        value={props.editableModel.attributes.date}
        onChange={props.setTime}
      />
    </SidebarForm>
  );
};

TransportLogSidebarFormComponent.defaultProps = {
  editableModel: null,
};

TransportLogSidebarFormComponent.propTypes = {
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
  setTime: PropTypes.func.isRequired,
  changeSecured: PropTypes.func.isRequired,
};

export default TransportLogSidebarFormComponent;
