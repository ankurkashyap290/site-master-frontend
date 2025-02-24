import React from 'react';
import PropTypes from 'prop-types';

import { FormControlLabel, Checkbox } from '@material-ui/core';
import SidebarForm from '../../ui-elements/sidebar-form';

const PolicySidebarFormComponent = (props) => {
  if (!props.editableModel) {
    return null;
  }
  return (
    <SidebarForm {...props}>
      <FormControlLabel
        control={
          <Checkbox
            name="view"
            checked={Boolean(props.editableModel.attributes.view)}
            onChange={props.handleChange}
          />
        }
        label="View"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="create"
            checked={Boolean(props.editableModel.attributes.create)}
            onChange={props.handleChange}
          />
        }
        label="Create"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="update"
            checked={Boolean(props.editableModel.attributes.update)}
            onChange={props.handleChange}
          />
        }
        label="Update"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="delete"
            checked={Boolean(props.editableModel.attributes.delete)}
            onChange={props.handleChange}
          />
        }
        label="Delete"
      />
    </SidebarForm>
  );
};

PolicySidebarFormComponent.defaultProps = {
  editableModel: null,
};

PolicySidebarFormComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  editableModel: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PolicySidebarFormComponent;
