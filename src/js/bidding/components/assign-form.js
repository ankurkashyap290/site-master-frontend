import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  FormGroup,
  Checkbox,
  Input,
  InputAdornment,
  IconButton,
  Icon,
} from '@material-ui/core';

import { fullNameAdapter } from 'store/adapters';
import TimePicker from '../../ui-elements/TimePicker';
import dateformats from '../../config/dateformats';
import SidebarForm from '../../ui-elements/sidebar-form';
import transportationType, { TRANSPORTATION_TYPE_INTERNAL, TRANSPORTATION_TYPE_EXTERNAL } from '../../config/transportation_type';

const AssignFormComponent = props => (
  <SidebarForm {...props}>
    <div className="back-button-container">
      <IconButton
        onClick={props.onClose}
        color="primary"
        className="back-button"
      >
        <Icon>arrow_back</Icon>
      </IconButton>
      <Typography variant="title">Assign Drivers</Typography>
    </div>
    <FormControl className="form-control">
      <Typography className="label">Event Name</Typography>
      <Typography>{props.editableModel.attributes.name}</Typography>
    </FormControl>
    <FormControl className="form-control">
      <InputLabel>Transportation Type</InputLabel>
      <Select
        name="transportation_type"
        value={props.editableModel.attributes.transportation_type || ''}
        onChange={props.onChange}
      >
        {Object.keys(transportationType).map(fieldName => (
          <MenuItem key={fieldName} value={fieldName}>{transportationType[fieldName]}</MenuItem>
        ))}
        <MenuItem value={`${TRANSPORTATION_TYPE_EXTERNAL}-custom`}>External (custom)</MenuItem>
      </Select>
    </FormControl>
    {props.errors['data.attributes.transportation_type'] ?
      <FormHelperText error>{props.errors['data.attributes.transportation_type'].detail}</FormHelperText>
    : null}
    {props.editableModel.attributes.transportation_type === TRANSPORTATION_TYPE_INTERNAL ?
      <FormControl component="fieldset">
        <Typography className="label">Driver</Typography>
        <RadioGroup
          name="user_id"
          value={props.editableModel.attributes.drivers[0].user_id}
          onChange={props.onDriverChange}
        >
          {props.internalDrivers.map(user => (
            <FormControlLabel
              key={user.id}
              value={user.id}
              control={<Radio />}
              label={fullNameAdapter(user.attributes)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    : null}
    {props.editableModel.attributes.transportation_type === TRANSPORTATION_TYPE_EXTERNAL ?
      <FormControl component="fieldset">
        <Typography className="label">Drivers</Typography>
        <FormGroup>
          {props.etcs.map(etc => (
            <FormControlLabel
              key={etc.id}
              control={
                <Checkbox
                  checked={props.editableModel.attributes.drivers
                    .filter(driver => driver.etc_id === etc.id.toString()).length === 1}
                  name="etc_id"
                  value={etc.id}
                  onChange={props.onETCChange}
                />
              }
              label={etc.attributes.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    : null}
    {props.editableModel.attributes.transportation_type === `${TRANSPORTATION_TYPE_EXTERNAL}-custom` ?
      <FormControl component="fieldset">
        <Typography className="label">Driver</Typography>
        <FormControl className="form-control">
          <InputLabel>Name</InputLabel>
          <Input
            name="name"
            value={props.editableModel.attributes.drivers[0].name}
            onChange={props.onDriverChange}
            onKeyUp={props.onEnter}
          />
        </FormControl>
        <FormControl className="form-control">
          <InputLabel>Emails (comma separated)</InputLabel>
          <Input
            name="emails"
            value={props.editableModel.attributes.drivers[0].emails}
            onChange={props.onDriverChange}
            onKeyUp={props.onEnter}
          />
        </FormControl>
        <FormControl className="form-control">
          <InputLabel>Transport Fee</InputLabel>
          <Input
            className="numeric-input"
            name="fee"
            value={props.editableModel.attributes.drivers[0].fee}
            onChange={props.onDriverChange}
            onKeyUp={props.onEnter}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <TimePicker
          label="Pickup Time"
          name="pickupTime"
          format={dateformats.timeFormat}
          value={props.editableModel.attributes.drivers[0].pickup_time_moment}
          onChange={props.setTime}
        />
      </FormControl>
    : null}
    {props.errors['data.attributes.drivers'] ?
      <FormHelperText error>{props.errors['data.attributes.drivers'].detail}</FormHelperText>
    : null}
  </SidebarForm>
);

AssignFormComponent.defaultProps = {
  editableModel: null,
  errors: {},
};

AssignFormComponent.propTypes = {
  editableModel: PropTypes.object,
  errors: PropTypes.object,
  internalDrivers: PropTypes.arrayOf(PropTypes.object).isRequired,
  etcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDriverChange: PropTypes.func.isRequired,
  onETCChange: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssignFormComponent;
