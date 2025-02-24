import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import { setEditableModelAttribute } from '../store/actions';
import AppointmentFieldsetComponent from '../components/appointment-fieldset';

class AppointmentFieldset extends React.Component {
  constructor(props) {
    super(props);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeAppointment = this.changeAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
  }

  handleTimeChange(moment) {
    this.handleChange('time_moment', moment);
  }

  handleLocationChange(location) {
    this.handleChange('location', location);
  }

  handleChange(key, value) {
    const mergedAttributes = Object.assign(
      {},
      this.props.appointment.attributes,
      {
        [key]: value,
      },
    );
    this.changeAppointment(Object.assign(
      {},
      this.props.appointment,
      mergedAttributes,
    ));
  }

  changeAppointment(changeableAppointment) {
    let passengers = cloneDeep(this.props.editableModel.attributes.passengers);
    passengers = passengers.map((passenger) => {
      const changeablePassenger = passenger;
      changeablePassenger.appointments = passenger.appointments.map(appointment => (
        appointment.key === changeableAppointment.key ? changeableAppointment : appointment
      ));
      return changeablePassenger;
    });

    this.props.setEditableModelAttribute('passengers', passengers);
  }

  deleteAppointment(deletableAppointment) {
    let passengers = cloneDeep(this.props.editableModel.attributes.passengers);
    passengers = passengers.map((passenger) => {
      const changeablePassenger = passenger;
      changeablePassenger.appointments = passenger.appointments.filter(appointment => (
        appointment.key !== deletableAppointment.key
      ));
      return changeablePassenger;
    });

    this.props.setEditableModelAttribute('passengers', passengers);
  }

  render() {
    return (<AppointmentFieldsetComponent
      {...this.props}
      onTimeChange={this.handleTimeChange}
      onLocationChange={this.handleLocationChange}
      onDelete={this.deleteAppointment}
    />);
  }
}

AppointmentFieldset.propTypes = {
  appointment: PropTypes.object.isRequired,
  editableModel: PropTypes.object.isRequired,
  setEditableModelAttribute: PropTypes.func.isRequired,
  deletable: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ calendarReducer }) => ({
  editableModel: calendarReducer.editableModel,
});

const mapDispatchToProps = dispatch => ({
  setEditableModelAttribute: (key, value) => dispatch(setEditableModelAttribute(key, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentFieldset);
