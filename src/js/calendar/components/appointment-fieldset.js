import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Icon, IconButton, Typography } from '@material-ui/core';
import TimePicker from 'ui-elements/TimePicker';

import dateformats from 'config/dateformats';
import LocationInput from 'locations/containers/location-input';

const AppointmentFieldsetComponent = props => (
  <Paper className="fieldset" style={{ position: 'relative' }}>
    <IconButton
      className="close-button"
      onClick={() => props.onDelete(props.appointment)}
      disabled={!props.deletable}
    >
      <Icon>close</Icon>
    </IconButton>
    <TimePicker
      label="Appointment Time"
      name="appointment_time"
      format={dateformats.timeFormat}
      value={props.appointment.time_moment}
      onChange={props.onTimeChange}
    />
    <Typography className="label">Appointment Location</Typography>
    <LocationInput
      showOneTime
      onChange={props.onLocationChange}
      locationId={parseInt(props.appointment.location.id, 10)}
    />
  </Paper>
);

AppointmentFieldsetComponent.propTypes = {
  appointment: PropTypes.object.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  onLocationChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  deletable: PropTypes.bool.isRequired,
};

export default AppointmentFieldsetComponent;
