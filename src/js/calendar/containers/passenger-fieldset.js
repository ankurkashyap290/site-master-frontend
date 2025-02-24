import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import { appointmentSkeleton } from '../../store/skeletons';
import { getClientList } from '../../clients/store/actions';
import { setEditableModelAttribute } from '../store/actions';
import { appointmentToEditableAdapter } from '../store/adapters';
import PassengerFieldsetComponent from '../components/passenger-fieldset';

class PassengerFieldset extends React.Component {
  constructor(props) {
    super(props);
    this.props.getClientList(this.props.selectedFacility.id);

    this.changePassenger = this.changePassenger.bind(this);
    this.deletePassenger = this.deletePassenger.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.handleClientChange = this.handleClientChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  changePassenger(changeablePassenger) {
    let passengers = cloneDeep(this.props.editableModel.attributes.passengers);
    passengers = passengers.map(passenger => (
      passenger.key === changeablePassenger.key ? changeablePassenger : passenger
    ));
    this.props.setEditableModelAttribute('passengers', passengers);
  }

  deletePassenger(deletablePassenger) {
    let passengers = cloneDeep(this.props.editableModel.attributes.passengers);
    passengers = passengers.filter(passenger => passenger.key !== deletablePassenger.key);
    this.props.setEditableModelAttribute('passengers', passengers);
  }

  addAppointment() {
    const changeablePassenger = cloneDeep(this.props.passenger);
    changeablePassenger.appointments
      .push(Object.assign({}, appointmentToEditableAdapter(appointmentSkeleton)));
    this.changePassenger(changeablePassenger);
  }

  handleClientChange({ id, value }) {
    const attributes = {
      client_id: id ? Number(id) : null,
      name: value,
    };

    /*
     * room number changes when a passenger is linked,
     * or resets when changing a linked passenger to unlinked
     */
    const clientMatch = this.props.clients.filter(client => Number(client.id) === Number(id))[0];
    if (clientMatch) {
      attributes.room_number = clientMatch.attributes.room_number;
    } else if (this.props.passenger.client_id) {
      attributes.room_number = '';
    }

    this.changePassenger(Object.assign(
      {},
      this.props.passenger,
      attributes,
    ));
  }

  handleChange(event) {
    const mergedAttributes = Object.assign(
      {},
      this.props.passenger.attributes,
      {
        [event.target.name]: (event.target.checked || event.target.value),
      },
    );
    this.changePassenger(Object.assign(
      {},
      this.props.passenger,
      mergedAttributes,
    ));
  }

  render() {
    return (<PassengerFieldsetComponent
      {...this.props}
      addAppointment={this.addAppointment}
      onClientChange={this.handleClientChange}
      onChange={this.handleChange}
      onDelete={this.deletePassenger}
      deletable={this.props.editableModel.attributes.passengers.length > 1}
    />);
  }
}

PassengerFieldset.propTypes = {
  passenger: PropTypes.object.isRequired,
  editableModel: PropTypes.object.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFacility: PropTypes.object.isRequired,
  setEditableModelAttribute: PropTypes.func.isRequired,
  getClientList: PropTypes.func.isRequired,
};

const mapStateToProps = ({ calendarReducer, clientReducer, facilityReducer }) => ({
  editableModel: calendarReducer.editableModel,
  clients: clientReducer.modelList,
  selectedFacility: facilityReducer.selectedFacility,
});

const mapDispatchToProps = dispatch => ({
  setEditableModelAttribute: (key, value) => dispatch(setEditableModelAttribute(key, value)),
  getClientList: () => dispatch(getClientList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassengerFieldset);
