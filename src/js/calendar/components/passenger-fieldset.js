import React from 'react';
import PropTypes from 'prop-types';
import { Paper, FormControl, InputLabel, Input, Button, Icon, IconButton } from '@material-ui/core';

import { fullNameAdapter, suggestionAdapter } from 'store/adapters';
import AutosuggestInput from '../../ui-elements/autosuggest-input';
import AppointmentFieldset from '../containers/appointment-fieldset';

const PassengerFieldsetComponent = (props) => {
  const { clients, passenger } = props;
  const suggestions =
    clients.map(client => suggestionAdapter(client.id, fullNameAdapter(client.attributes)));
  return (
    <Paper className="fieldset" style={{ position: 'relative' }}>
      <IconButton
        className="close-button"
        onClick={() => props.onDelete(props.passenger)}
        disabled={!props.deletable}
      >
        <Icon>close</Icon>
      </IconButton>
      <AutosuggestInput
        suggestions={suggestions}
        label="Passenger Name"
        id={passenger.client_id}
        value={passenger.name}
        onChange={props.onClientChange}
      />
      <FormControl className="form-control">
        <InputLabel>Passenger Room #</InputLabel>
        <Input
          name="room_number"
          value={passenger.room_number}
          onChange={props.onChange}
          disabled={Boolean(passenger.client_id)}
        />
      </FormControl>
      {passenger.appointments.map(appointment => (
        <AppointmentFieldset
          key={appointment.key}
          appointment={appointment}
          deletable={passenger.appointments.length > 1}
        />))}
      <Button color="secondary" onClick={props.addAppointment}>
        <Icon>add</Icon> Assign more Appointments
      </Button>
    </Paper>
  );
};

PassengerFieldsetComponent.defaultProps = {
  clients: [],
  passenger: {},
};

PassengerFieldsetComponent.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.object),
  passenger: PropTypes.object,
  addAppointment: PropTypes.func.isRequired,
  onClientChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  deletable: PropTypes.bool.isRequired,
};

export default PassengerFieldsetComponent;
