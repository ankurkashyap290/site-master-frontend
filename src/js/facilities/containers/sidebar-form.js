import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import FacilitySidebarFormComponent from '../components/sidebar-form';
import { saveModel, setEditableModel } from '../store/actions';
import { validationErrorSkeleton } from '../../store/skeletons';
import CrudContainer from '../../common/crud-container';

class FacilitySidebarForm extends CrudContainer {
  constructor(props) {
    super(props);
    this.state = {
      editableModel: null,
      errors: {},
      loading: false,
    };
    this.getTitle = this.getTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.setLocation = this.setLocation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editableModel) {
      document.addEventListener('keydown', this.handleEscape);
      this.setState({ editableModel: nextProps.editableModel, errors: {}, loading: false });
      return;
    }
    document.removeEventListener('keydown', this.handleEscape);
  }

  getTitle() {
    if (this.props.editableModel && this.props.editableModel.id) {
      return this.props.editableModel.attributes.name;
    }
    return 'New Facility';
  }

  setLocation(locationModel) {
    this.handleChange({ target: { name: 'location_id', value: locationModel.id } });
  }

  handleChange(event) {
    const attributes = cloneDeep(this.state.editableModel.attributes);
    attributes[event.target.name] = event.target.value;

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
    const { attributes } = this.state.editableModel;
    const errors = [];
    if (!attributes.name.length) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'Name is required.', source: { pointer: 'data.attributes.name' } },
      ));
    }
    if (!attributes.timezone.length) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'Timezone is required.', source: { pointer: 'data.attributes.timezone' } },
      ));
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
      <FacilitySidebarFormComponent
        loading={this.state.loading}
        isOpen={this.props.editableModel !== null}
        editableModel={this.state.editableModel}
        title={this.getTitle()}
        errors={this.state.errors}
        onSave={this.handleSave}
        onClose={this.props.close}
        handleChange={this.handleChange}
        handleEnter={this.handleEnter}
        journeyUser={this.props.journeyUser}
        setLocation={this.setLocation}
      />
    );
  }
}

FacilitySidebarForm.defaultProps = {
  editableModel: null,
};

FacilitySidebarForm.propTypes = {
  editableModel: PropTypes.object,
  setEditableModel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = ({ facilityReducer, authReducer }) => ({
  isOpen: facilityReducer.editableModel !== null,
  editableModel: facilityReducer.editableModel,
  journeyUser: authReducer.journeyUser,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  save: model => dispatch(saveModel(model)),
  close: () => dispatch(setEditableModel(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilitySidebarForm);
