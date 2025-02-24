import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import ClientSidebarFormComponent from '../components/sidebar-form';
import { saveModel, setEditableModel } from '../store/actions';
import { validationErrorSkeleton } from '../../store/skeletons';
import CrudContainer from '../../common/crud-container';

class ClientSidebarForm extends CrudContainer {
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
      const { attributes } = this.props.editableModel;
      return `${attributes.first_name} ${attributes.middle_name} ${attributes.last_name}`;
    }
    return 'New Client';
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
    if (!this.state.editableModel.attributes.first_name.length) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'First Name is required.', source: { pointer: 'data.attributes.first_name' } },
      ));
    }
    if (!this.state.editableModel.attributes.last_name.length) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'Last Name is required.', source: { pointer: 'data.attributes.last_name' } },
      ));
    }
    if (!this.state.editableModel.attributes.room_number) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'Room number is required.', source: { pointer: 'data.attributes.room_number' } },
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
      <ClientSidebarFormComponent
        loading={this.state.loading}
        isOpen={this.props.editableModel !== null}
        editableModel={this.state.editableModel}
        title={this.getTitle()}
        errors={this.state.errors}
        onSave={this.handleSave}
        onClose={this.props.close}
        handleChange={this.handleChange}
        handleEnter={this.handleEnter}
      />
    );
  }
}

ClientSidebarForm.defaultProps = {
  editableModel: null,
};

ClientSidebarForm.propTypes = {
  editableModel: PropTypes.object,
  setEditableModel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = ({ clientReducer }) => ({
  isOpen: clientReducer.editableModel !== null,
  editableModel: clientReducer.editableModel,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  save: model => dispatch(saveModel(model)),
  close: () => dispatch(setEditableModel(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientSidebarForm);
