import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import moment from 'moment';

import CrudContainer from 'common/crud-container';
import TransportLogSidebarFormComponent from 'transport-logs/components/sidebar-form';
import { saveModel, setEditableModel } from 'transport-logs/store/actions';
import { validationErrorSkeleton } from 'store/skeletons';
import dateformats from 'config/dateformats';

class TransportLogSidebarForm extends CrudContainer {
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
    this.setTime = this.setTime.bind(this);
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

  setDate(date) {
    this.changeAttribute('date', date);
  }

  setTime(time) {
    this.changeAttribute('date', time);
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
    const errors = ['location_name', 'client_name', 'signature']
      .filter(fieldName => !attributes[fieldName].length)
      .map(fieldName => Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'This field is required.', source: { pointer: `data.attributes.${fieldName}` } },
      ));

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
      <TransportLogSidebarFormComponent
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
        setTime={this.setTime}
        changeSecured={this.changeSecured}
      />
    );
  }
}

TransportLogSidebarForm.defaultProps = {
  editableModel: null,
  selectedFacilityId: 0,
};

TransportLogSidebarForm.propTypes = {
  editableModel: PropTypes.object,
  setEditableModel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  selectedFacilityId: PropTypes.number,
};

const mapStateToProps = ({ transportLogReducer, authReducer, facilityReducer }) => ({
  isOpen: transportLogReducer.editableModel !== null,
  editableModel: transportLogReducer.editableModel,
  title: transportLogReducer.editableModel && transportLogReducer.editableModel.id ?
    'Edit Transport Log' : 'New Transport Log',
  userId: authReducer.journeyUser.id,
  selectedFacilityId: facilityReducer.selectedFacility.id,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  save: model => dispatch(saveModel(model)),
  close: () => dispatch(setEditableModel(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransportLogSidebarForm);
