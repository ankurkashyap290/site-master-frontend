import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import EventSidebarFormComponent from '../components/sidebar-form';
import { saveModel, setEditableModel } from '../store/actions';
import { validationErrorSkeleton, passengerSkeleton } from '../../store/skeletons';
import CrudContainer from '../../common/crud-container';
import { rruleFromStringAdapter, rruleToStringAdapter, passengerToEditableAdapter, eventFromEditableAdapter } from '../store/adapters';
import RecurrenceDialog from './recurrence-dialog';

class EventSidebarForm extends CrudContainer {
  constructor(props) {
    super(props);
    this.state = {
      editableModel: props.editableModel,
      editableRrule: null,
      errors: {},
      loading: false,
    };
    this.getTitle = this.getTitle.bind(this);
    this.setDateTime = this.setDateTime.bind(this);
    this.setErrors = this.setErrors.bind(this);

    this.addPassenger = this.addPassenger.bind(this);

    this.setRrule = this.setRrule.bind(this);
    this.saveRrule = this.saveRrule.bind(this);
    this.clearRrule = this.clearRrule.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.setLocation = this.setLocation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editableModel) {
      this.setState({ errors: {}, loading: false });
      document.addEventListener('keydown', this.handleEscape);
      return;
    }
    document.removeEventListener('keydown', this.handleEscape);
  }

  getTitle() {
    if (this.props.editableModel && this.props.editableModel.id) {
      return 'Edit Event';
    }
    return 'New Event';
  }

  addPassenger() {
    const passengers = cloneDeep(this.props.editableModel.attributes.passengers);
    passengers.push(Object.assign({}, passengerToEditableAdapter(passengerSkeleton)));
    this.changeAttribute('passengers', passengers);
  }

  setDateTime(attributeName) {
    return dateTime => this.changeAttribute(attributeName, dateTime);
  }

  changeAttribute(key, value) {
    const attributes = cloneDeep(this.props.editableModel.attributes);
    attributes[key] = value;
    this.props.setEditableModel(Object.assign(
      {},
      this.props.editableModel,
      { attributes },
    ));
  }

  setRrule() {
    this.setState({
      editableRrule: rruleFromStringAdapter(this.props.editableModel.attributes.rrule),
    });
    document.removeEventListener('keydown', this.handleEscape);
  }

  saveRrule(rrule) {
    this.handleChange({ target: { name: 'rrule', value: rruleToStringAdapter(rrule) } });
    this.clearRrule();
  }

  clearRrule() {
    document.addEventListener('keydown', this.handleEscape);
    this.setState({ editableRrule: null });
  }

  setLocation({ id }) {
    this.changeAttribute('location_id', id);
  }

  handleChange(event) {
    this.changeAttribute(event.target.name, event.target.value);
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.handleSave();
    }
  }

  handleEscape(event) {
    if (event.keyCode === 27) {
      this.props.close();
    }
  }

  handleSave() {
    const model = eventFromEditableAdapter(this.props.editableModel);

    const { attributes } = model;

    const errors = ['name', 'location_id', 'date', 'start_time', 'end_time', 'transport_type']
      .filter(fieldName => !attributes[fieldName])
      .map(fieldName => Object.assign(
        {},
        validationErrorSkeleton,
        {
          detail: 'This field is required.',
          source: { pointer: `data.attributes.${fieldName}` },
        },
      ));

    if (attributes.rrule && !rruleFromStringAdapter(attributes.rrule).options.interval) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'Repetition frequency must be greater than zero.', source: { pointer: 'data.attributes.rrule' } },
      ));
    }

    if (errors.length) {
      this.setErrors(errors);
      return;
    }

    this.setState({ loading: true });

    this.props.save(model)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((error) => {
        if (error.response.status < 500) {
          this.setErrors(error.response.data.errors);
        } else {
          this.addError(Object.assign(
            {},
            validationErrorSkeleton,
            { detail: error.response.statusText },
          ));
        }
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <RecurrenceDialog
          rrule={this.state.editableRrule}
          onSave={this.saveRrule}
          onDiscard={this.clearRrule}
        />
        <EventSidebarFormComponent
          loading={this.state.loading}
          isOpen={this.props.editableModel !== null}
          editableModel={this.props.editableModel}
          title={this.getTitle()}
          errors={this.state.errors}
          onSave={this.handleSave}
          onClose={this.props.close}
          addPassenger={this.addPassenger}
          setDateTime={this.setDateTime}
          setRrule={this.setRrule}
          saveRrule={this.saveRrule}
          handleChange={this.handleChange}
          handleEnter={this.handleEnter}
          setLocation={this.setLocation}
        />
      </div>
    );
  }
}

EventSidebarForm.defaultProps = {
  editableModel: null,
};

EventSidebarForm.propTypes = {
  editableModel: PropTypes.object,
  setEditableModel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = ({ calendarReducer }) => ({
  isOpen: calendarReducer.editableModel !== null,
  editableModel: calendarReducer.editableModel,
  drivers: calendarReducer.drivers,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  save: model => dispatch(saveModel(model)),
  close: () => dispatch(setEditableModel(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventSidebarForm);
