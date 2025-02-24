import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Button,
  Typography,
  CircularProgress,
  FormHelperText,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core';

import TextInput from 'ui-elements/text-input';
import { rolesGetNameById } from 'config/roles';

const MyProfileComponent = props => (
  <Paper className="page-wrapper">
    <Typography variant="headline" paragraph>
      My Profile
    </Typography>
    <TextInput {...props} name="first_name" label="First Name" autoFocus />
    <TextInput {...props} name="middle_name" label="Middle Name" />
    <TextInput {...props} name="last_name" label="Last Name" />
    <FormControl className="form-control" >
      <InputLabel>Role</InputLabel>
      <Input
        name="role"
        value={rolesGetNameById(props.editableModel.attributes.role_id)}
        disabled
      />
    </FormControl>
    <TextInput {...props} name="email" label="Email" disabled />
    <TextInput {...props} name="phone" label="Phone" />
    {props.errors['data.attributes'] ?
      <FormHelperText error>{props.errors['data.attributes'].detail}</FormHelperText>
      : null}
    <div className="button-container">
      {props.loading ? <CircularProgress color="secondary" className="smallCircularProgress" /> : null}
      <Button
        color="primary"
        onClick={props.onDiscard}
        disabled={props.loading}
      >
        Reset
      </Button>
      <Button
        color="secondary"
        variant="raised"
        onClick={props.onSave}
        disabled={props.loading}
      >
        Save changes
      </Button>
    </div>
  </Paper>
);

MyProfileComponent.defaultProps = {
  editableModel: null,
};

MyProfileComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  editableModel: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
};

export default MyProfileComponent;
