import React from 'react';
import PropTypes from 'prop-types';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  IconButton,
  Icon,
  Button,
} from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import LocationInput from 'locations/containers/location-input';
import PassengerFieldset from '../containers/passenger-fieldset';
import dateformats from '../../config/dateformats';
import transportType from '../../config/transport_type';
import TextInput from '../../ui-elements/text-input';
import SidebarForm from '../../ui-elements/sidebar-form';
import TimePicker from '../../ui-elements/TimePicker';
import { rruleFromStringAdapter } from '../store/adapters';

const EventSidebarFormComponent = (props) => {
  if (!props.editableModel) {
    return null;
  }
  const { attributes } = props.editableModel;
  return (
    <SidebarForm {...props}>
      <TextInput {...props} name="name" label="Event Name" autoFocus />
      <Typography className="label">Passengers &amp; Appointments</Typography>
      {attributes.passengers.map(passenger => (
        <PassengerFieldset
          key={passenger.key}
          passenger={passenger}
        />))}
      {props.errors['data.attributes.passengers'] ?
        <FormHelperText error>{props.errors['data.attributes.passengers'].detail}</FormHelperText>
      : ''}
      <Button color="secondary" style={{ marginBottom: '12px' }} onClick={props.addPassenger}>
        <Icon>add</Icon> Assign more Passengers
      </Button>
      <Typography className="label">From Location</Typography>
      <LocationInput
        showOneTime
        onChange={props.setLocation}
        locationId={parseInt(attributes.location_id, 10)}
        error={props.errors['data.attributes.location_id']}
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div>
          <DatePicker
            className="picker"
            keyboard
            label="Date"
            format={dateformats.dateFormat}
            mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
            value={props.editableModel.attributes.date_moment}
            onChange={props.setDateTime('date_moment')}
            disableOpenOnEnter
            error={Boolean(props.errors['data.attributes.date'])}
            helperText={props.errors['data.attributes.date'] ? props.errors['data.attributes.date'].detail : ''}
          />
        </div>
      </MuiPickersUtilsProvider>
      <div>
        <TimePicker
          label="Start Time"
          format={dateformats.timeFormat}
          name="start_time"
          value={props.editableModel.attributes.start_time_moment}
          onChange={props.setDateTime('start_time_moment')}
          error={Boolean(props.errors['data.attributes.start_time'])}
          helperText={props.errors['data.attributes.start_time'] ? props.errors['data.attributes.start_time'].detail : ''}
        />
      </div>
      <div>
        <TimePicker
          label="End Time"
          format={dateformats.timeFormat}
          name="end_time"
          value={props.editableModel.attributes.end_time_moment}
          onChange={props.setDateTime('end_time_moment')}
          error={Boolean(props.errors['data.attributes.end_time'])}
          helperText={props.errors['data.attributes.end_time'] ? props.errors['data.attributes.end_time'].detail : ''}
        />
      </div>
      <FormControl className="setter">
        <FormHelperText>Recurrence</FormHelperText>
        <div className="spread">
          <Typography style={{ marginTop: '12px' }}>
            {props.editableModel.attributes.rrule ?
              rruleFromStringAdapter(props.editableModel.attributes.rrule).toText() :
              'does not repeat'}
          </Typography>
          <div>
            <IconButton
              color="primary"
              aria-label="close"
              onClick={props.setRrule}
            >
              <Icon>mode_edit</Icon>
            </IconButton>
            <IconButton
              color="primary"
              aria-label="close"
              onClick={() => props.saveRrule('')}
              disabled={!props.editableModel.attributes.rrule}
            >
              <Icon>delete</Icon>
            </IconButton>
          </div>
        </div>
        {props.errors['data.attributes.rrule'] ?
          <FormHelperText error>{props.errors['data.attributes.rrule'].detail}</FormHelperText>
        : ''}
      </FormControl>
      <FormControl className="select">
        <InputLabel>Transport Type</InputLabel>
        <Select
          name="transport_type"
          value={attributes.transport_type}
          onChange={props.handleChange}
        >
          {Object.keys(transportType).map(fieldName => (
            <MenuItem key={fieldName} value={fieldName}>{transportType[fieldName]}</MenuItem>
          ))}
        </Select>
        {props.errors['data.attributes.transport_type'] ?
          <FormHelperText error>{props.errors['data.attributes.transport_type'].detail}</FormHelperText>
        : ''}
      </FormControl>
      <TextInput {...props} name="description" label="Descripition (optional)" multiline />
      <TextInput {...props} name="user_name" label="Created By" disabled />
    </SidebarForm>
  );
};

EventSidebarFormComponent.defaultProps = {
  editableModel: null,
};

EventSidebarFormComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  editableModel: PropTypes.object,
  setRrule: PropTypes.func.isRequired,
  saveRrule: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  addPassenger: PropTypes.func.isRequired,
  setDateTime: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
};

export default EventSidebarFormComponent;
