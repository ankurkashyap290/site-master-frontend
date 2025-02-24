import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import { validationErrorSkeleton } from 'store/skeletons';
import ETCSidebarFormComponent from '../components/sidebar-form';
import { saveModel, setEditableModel } from '../store/actions';
import CrudContainer from '../../common/crud-container';
import { etcSkeleton } from '../../store/skeletons';

class ETCSidebarForm extends CrudContainer {
  constructor(props) {
    super(props);
    this.state = {
      editableModel: null,
      errors: {},
      loading: false,
    };
    this.getTitle = this.getTitle.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editableModel) {
      document.addEventListener('keydown', this.handleEscape);
      this.setState({
        editableModel: Object.assign({}, etcSkeleton, nextProps.editableModel),
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
    return 'New External Transportation Company';
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

    const errors = [];

    if (!this.state.editableModel.attributes.name.length) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'Name is required.', source: { pointer: 'data.attributes.name' } },
      ));
    }
    if (!this.state.editableModel.attributes.emails.length) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'At least one email is required.', source: { pointer: 'data.attributes.emails' } },
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
      <ETCSidebarFormComponent
        loading={this.state.loading}
        isOpen={this.props.isOpen}
        editableModel={this.state.editableModel}
        title={this.getTitle()}
        errors={this.state.errors}
        onSave={this.handleSave}
        onClose={this.props.close}
        handleChange={this.handleChange}
        handleEnter={this.handleEnter}
        setLocation={this.setLocation}
      />
    );
  }
}

ETCSidebarForm.defaultProps = {
  editableModel: null,
};

ETCSidebarForm.propTypes = {
  editableModel: PropTypes.object,
  setEditableModel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = ({ etcReducer }) => ({
  isOpen: etcReducer.editableModel !== null,
  editableModel: etcReducer.editableModel,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  save: model => dispatch(saveModel(model)),
  close: () => dispatch(setEditableModel(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ETCSidebarForm);
