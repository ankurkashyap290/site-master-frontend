import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import moment from 'moment';

import CrudContainer from 'common/crud-container';
import TransportBillingLogSidebarFormComponent from 'transport-billing-logs/components/sidebar-form';
import { saveModel, setEditableModel } from 'transport-billing-logs/store/actions';
import { validationErrorSkeleton } from 'store/skeletons';
import dateformats from 'config/dateformats';

class TransportBillingLogSidebarForm extends CrudContainer {
  constructor(props) {
    super(props);
    this.state = {
      editableModel: props.editableModel,
      errors: {},
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.setDate = this.setDate.bind(this);
    this.changeSecured = this.changeSecured.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editableModel) {
      const editableModel = cloneDeep(nextProps.editableModel);
      if (nextProps.editableModel.id) {
        editableModel.attributes.date = moment(
          editableModel.attributes.date,
          dateformats.dbDateTimeFormat,
        );
      }
      document.addEventListener('keydown', this.handleEscape);
      this.setState({ editableModel, errors: {}, loading: false });
      return;
    }
    document.removeEventListener('keydown', this.handleEscape);
  }

  setDate(dateTime) {
    this.changeAttribute('date', dateTime);
  }

  handleChange(event) {
    this.changeAttribute(event.target.name, event.target.value);
  }

  changeSecured(event, checked) {
    this.changeAttribute(event.target.name, checked);
  }

  changeAttribute(key, value) {
    const attributes = cloneDeep(this.state.editableModel.attributes);
    attributes[key] = value;

    this.props.setEditableModel(Object.assign(
      {},
      this.state.editableModel,
      { attributes },
    ));
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
    const { attributes } = this.state.editableModel;
    const errors = [
      ...[
        'mileage_to_start',
        'mileage_to_end',
        'mileage_return_start',
        'mileage_return_end',
        'fee',
      ]
        .filter(fieldName => !parseInt(attributes[fieldName], 10))
        .map(fieldName => Object.assign(
          {},
          validationErrorSkeleton,
          { detail: 'Only integer value accepted!', source: { pointer: `data.attributes.${fieldName}` } },
        )),
      ...[
        'location_name',
        'client_name',
        'mileage_to_start',
        'mileage_to_end',
        'mileage_return_start',
        'mileage_return_end',
        'fee',
      ]
        .filter(fieldName => !attributes[fieldName])
        .map(fieldName => Object.assign(
          {},
          validationErrorSkeleton,
          { detail: 'This field is required.', source: { pointer: `data.attributes.${fieldName}` } },
        )),
    ];

    if (errors.length) {
      this.setErrors(errors);
      return;
    }

    this.setState({ loading: true });
    const model = Object.assign(
      {},
      this.state.editableModel,
      {
        attributes: Object.assign(
          {},
          attributes,
          {
            date: attributes.date.format(dateformats.dbDateTimeFormat),
            user_id: this.props.userId,
            facility_id: this.props.selectedFacilityId,
          },
        ),
      },
    );

    this.props.save(model).then(() => {
      this.setState({ loading: false });
    }).catch((error) => {
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
      <TransportBillingLogSidebarFormComponent
        loading={this.state.loading}
        isOpen={this.props.editableModel !== null}
        editableModel={this.state.editableModel}
        title={this.props.title}
        errors={this.state.errors}
        onSave={this.handleSave}
        onClose={this.props.close}
        handleChange={this.handleChange}
        handleEnter={this.handleEnter}
        setDate={this.setDate}
        changeSecured={this.changeSecured}
      />
    );
  }
}

TransportBillingLogSidebarForm.defaultProps = {
  editableModel: null,
  selectedFacilityId: 0,
};

TransportBillingLogSidebarForm.propTypes = {
  editableModel: PropTypes.object,
  setEditableModel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  selectedFacilityId: PropTypes.number,
};

const mapStateToProps = ({ transportBillingLogReducer, authReducer, facilityReducer }) => ({
  isOpen: transportBillingLogReducer.editableModel !== null,
  editableModel: transportBillingLogReducer.editableModel,
  title: transportBillingLogReducer.editableModel && transportBillingLogReducer.editableModel.id ?
    'Edit Transport Billing Log' : 'New Transport Billing Log',
  userId: authReducer.journeyUser.id,
  selectedFacilityId: parseInt(facilityReducer.selectedFacility.id, 10),
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  save: model => dispatch(saveModel(model)),
  close: () => dispatch(setEditableModel(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransportBillingLogSidebarForm);
