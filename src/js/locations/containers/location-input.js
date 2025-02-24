import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { find, cloneDeep } from 'lodash';

import { statesSuggestions } from 'locations/store/us-states';
import { getLocationList, addLocation } from 'locations/store/actions';
import { locationSkeleton, validationErrorSkeleton } from 'store/skeletons';
import LocationSelectComponent from '../components/location-select';
import LocationInlineFormComponent from '../components/location-inline-form';
import CrudContainer from '../../common/crud-container';

class LocationInput extends CrudContainer {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      errors: {},
      selectedLocation: '',
      location: props.location || null,
      showForm: false,
      editableModel: cloneDeep(locationSkeleton),
    };

    this.addNew = this.addNew.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.changeOneTime = this.changeOneTime.bind(this);
    this.setEditableModel = this.setEditableModel.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.close = this.close.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getLocationList(this.props.facility)
      .then(() => {
        if (this.props.locationId) {
          const location = find(this.props.modelList, { id: this.props.locationId.toString() });
          this.setState({
            loading: false,
            selectedLocation: this.props.locationId.toString(),
            location,
            errors: {},
          });
          return;
        }
        this.setState({
          loading: false,
        });
      });
  }

  addNew() {
    this.setState({ showForm: true });
  }

  close() {
    this.setState({ showForm: false });
  }

  setEditableModel(attributes) {
    this.setState({
      editableModel: Object.assign(
        {},
        this.state.editableModel,
        {
          attributes: Object.assign(
            {},
            this.state.editableModel.attributes,
            attributes,
          ),
        },
      ),
    });
  }

  handleInputChange(event) {
    this.setEditableModel({ [event.target.name]: event.target.value });
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.handleSave();
    }
  }

  changeOneTime() {
    this.setEditableModel({ one_time: !this.state.editableModel.attributes.one_time });
  }

  isValid() {
    const editableModel = cloneDeep(this.state.editableModel);
    let isValid = true;
    Object.keys(editableModel.attributes).map((field) => {
      if (!editableModel.attributes[field].length && field !== 'phone') {
        editableModel.error[field] = 'Required field';
        isValid = false;
      }
      return isValid;
    });
    if (!isValid) {
      this.setState({ editableModel });
    }
    return isValid;
  }

  handleSave() {
    this.setErrors({});

    const errors = [];
    const fieldNames = Object.keys(this.state.editableModel.attributes);
    for (let i = 0; i < fieldNames.length; i += 1) {
      if (
        fieldNames[i] === 'state' &&
        !this.state.editableModel.attributes[fieldNames[i]]
      ) {
        errors.push(Object.assign(
          {},
          validationErrorSkeleton,
          {
            detail: 'This field is required and it\'s need to be a valid state.',
            source: { pointer: `data.attributes.${fieldNames[i]}` },
          },
        ));
      } else
      if (
        ['phone', 'one_time'].indexOf(fieldNames[i]) === -1 &&
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
    this.props.save(this.state.editableModel, this.props.facility)
      .then(() => {
        const location = this.props.modelList[this.props.modelList.length - 1];
        this.props.onChange(location);
        this.setState({
          loading: false,
          showForm: false,
          location,
          selectedLocation: location.id.toString(),
        });
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

  handleChange(event) {
    const location = find(this.props.modelList, { id: event.target.value });
    this.props.onChange(location);
    this.setState({ selectedLocation: event.target.value, location });
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

  render() {
    if (this.state.loading) {
      return null;
    }
    if (this.state.showForm) {
      return (
        <LocationInlineFormComponent
          editableModel={this.state.editableModel}
          handleChange={this.handleInputChange}
          handleChangeState={this.handleChangeState}
          handleEnter={this.handleEnter}
          showOneTime={this.props.showOneTime}
          changeOneTime={this.changeOneTime}
          close={this.close}
          handleSave={this.handleSave}
          errors={this.state.errors}
        />
      );
    }
    return (
      <LocationSelectComponent
        selectedLocation={this.state.selectedLocation}
        modelList={this.props.modelList}
        handleChange={this.handleChange}
        location={this.state.location}
        showForm={this.state.showForm}
        addNew={this.addNew}
        error={this.props.error}
      />
    );
  }
}

LocationInput.defaultProps = {
  facility: null,
  modelList: [],
  location: null,
  locationId: '',
  error: {},
  showOneTime: false,
  changeOneTime: () => {},
};

LocationInput.propTypes = {
  facility: PropTypes.object,
  modelList: PropTypes.arrayOf(PropTypes.object),
  getLocationList: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  location: PropTypes.object,
  locationId: PropTypes.number,
  error: PropTypes.object,
  showOneTime: PropTypes.bool,
  changeOneTime: PropTypes.func,
};

const mapStateToProps = ({ locationReducer }) => ({
  modelList: locationReducer.modelList,
});

const mapDispatchToProps = dispatch => ({
  getLocationList: facility => dispatch(getLocationList(facility)),
  save: (data, facility) => dispatch(addLocation(data, facility)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationInput);
