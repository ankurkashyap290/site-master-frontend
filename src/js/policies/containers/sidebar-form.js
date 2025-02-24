import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import PolicySidebarFormComponent from '../components/sidebar-form';
import { saveModel, setEditableModel } from '../store/actions';
import { validationErrorSkeleton } from '../../store/skeletons';
import CrudContainer from '../../common/crud-container';
import { rolesGetNameById } from '../../config/roles';

class PolicySidebarForm extends CrudContainer {
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
      return `${rolesGetNameById(attributes.role_id)} can ... ${attributes.entity}`;
    }
    return '(Unknown)';
  }

  handleChange(event) {
    const attributes = cloneDeep(this.state.editableModel.attributes);
    attributes[event.target.name] = Number(event.target.checked);

    this.props.setEditableModel(Object.assign(
      {},
      this.state.editableModel,
      { attributes },
    ));
  }

  handleEscape(event) {
    if (event.keyCode === 27) {
      this.props.close();
    }
  }

  handleSave() {
    this.setErrors({});
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
      <PolicySidebarFormComponent
        loading={this.state.loading}
        isOpen={this.props.editableModel !== null}
        editableModel={this.state.editableModel}
        title={this.getTitle()}
        errors={this.state.errors}
        onSave={this.handleSave}
        onClose={this.props.close}
        handleChange={this.handleChange}
      />
    );
  }
}

PolicySidebarForm.defaultProps = {
  editableModel: null,
};

PolicySidebarForm.propTypes = {
  editableModel: PropTypes.object,
  setEditableModel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = ({ policyReducer }) => ({
  isOpen: policyReducer.editableModel !== null,
  editableModel: policyReducer.editableModel,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  save: model => dispatch(saveModel(model)),
  close: () => dispatch(setEditableModel(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PolicySidebarForm);
