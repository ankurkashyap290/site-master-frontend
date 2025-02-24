import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import { statesSuggestions } from 'locations/store/us-states';
import LocationSidebarFormComponent from 'locations/components/sidebar-form';
import { saveModel, setEditableModel } from 'locations/store/actions';
import { validationErrorSkeleton } from '../../store/skeletons';
import CrudContainer from '../../common/crud-container';

class LocationSidebarForm extends CrudContainer {
  constructor(props) {
    super(props);
    this.state = {
      editableModel: props.editableModel,
      errors: {},
      loading: false,
    };
    this.getTitle = this.getTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editableModel) {
      document.addEventListener('keydown', this.handleEscape);
      this.setState({
        editableModel: nextProps.editableModel,
        errors: {},
        loading: false,
      });
      return;
    }
    document.removeEventListener('keydown', this.handleEscape);
  }

  getTitle() {
    if (this.props.editableModel && this.props.editableModel.id) {
      return this.props.editableModel.attributes.name;
    }
    return 'New Location';
  }

  handleChange(event) {
    const attributes = cloneDeep(this.state.editableModel.attributes);
    attributes[event.target.name] = event.target.value;

    this.setEditableModel(attributes);
  }

  handleChangeState(state) {
    const attributes = cloneDeep(this.state.editableModel.attributes);
    attributes.state = undefined;
    if (state.value.length) {
      attributes.state = statesSuggestions
        .filter(stateSuggestion =>
          stateSuggestion.value.toLowerCase() === state.value.toLowerCase())
        .map(newState => newState.id)
        .toString();
    }

    this.setEditableModel(attributes);
  }

  setEditableModel(attributes) {
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
    this.setErrors({});

    const errors = [];
    const fieldNames = Object.keys(this.state.editableModel.attributes);
    for (let i = 0; i < fieldNames.length; i += 1) {
      if (
        fieldNames[i] === 'state' &&
        this.state.editableModel.attributes[fieldNames[i]] === undefined
      ) {
        errors.push(Object.assign(
          {},
          validationErrorSkeleton,
          {
            detail: 'This field is required and it\'s need to be a valid state.',
            source: { pointer: `data.attributes.${fieldNames[i]}` },
          },
        ));
      } else if (
        fieldNames[i] !== 'phone' &&
        fieldNames[i] !== 'facility_id' &&
        !this.state.editableModel.attributes[fieldNames[i]].length
      ) {
        errors.push(Object.assign(
          {},
          validationErrorSkeleton,
          {
            detail: 'This field is required.',
            source: { pointer: `data.attributes.${fieldNames[i]}` },
          },
        ));
      }
    }

    if (errors.length) {
      this.setErrors(errors);
      return;
    }

    this.setState({ loading: true });
    this.props.save(this.state.editableModel).then(() => {
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
      <LocationSidebarFormComponent
        loading={this.state.loading}
        isOpen={this.props.editableModel !== null}
        editableModel={this.state.editableModel}
        title={this.getTitle()}
        errors={this.state.errors}
        onSave={this.handleSave}
        onClose={this.props.close}
        handleChange={this.handleChange}
        handleChangeState={this.handleChangeState}
        handleEnter={this.handleEnter}
      />
    );
  }
}

LocationSidebarForm.defaultProps = {
  editableModel: null,
};

LocationSidebarForm.propTypes = {
  editableModel: PropTypes.object,
  setEditableModel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = ({ locationReducer }) => ({
  isOpen: locationReducer.editableModel !== null,
  editableModel: locationReducer.editableModel,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  save: model => dispatch(saveModel(model)),
  close: () => dispatch(setEditableModel(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationSidebarForm);
