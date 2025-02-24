import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography, CircularProgress, TextField, FormControl, FormHelperText } from '@material-ui/core';

const ChangePasswordComponent = (props) => {
  if (props.done) {
    return (
      <Paper className="page-wrapper">
        <Typography variant="headline" paragraph>
          Change My Password
        </Typography>
        <Typography paragraph>
          Your password has been successfully changed.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className="page-wrapper">
      <Typography variant="headline" paragraph>
        Change My Password
      </Typography>
      <FormControl className="form-control" error={Boolean(props.error)}>
        <TextField
          value={props.oldPassword}
          label="Old Password"
          type="password"
          name="oldPassword"
          onChange={props.handleChange}
          onKeyUp={props.handleEnter}
          fullWidth
        />
      </FormControl>
      <FormControl className="form-control" error={Boolean(props.error)}>
        <TextField
          autoFocus
          value={props.password}
          label="New Password"
          type="password"
          name="password"
          onChange={props.handleChange}
          onKeyUp={props.handleEnter}
          fullWidth
        />
      </FormControl>
      <FormControl className="form-control" error={Boolean(props.error)}>
        <TextField
          value={props.passwordConfirm}
          label="New Password (confirm)"
          type="password"
          name="passwordConfirm"
          onChange={props.handleChange}
          onKeyUp={props.handleEnter}
          fullWidth
        />
      </FormControl>
      <FormHelperText error={Boolean(props.error)}>{props.error}</FormHelperText>
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
};

ChangePasswordComponent.propTypes = {
  done: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  oldPassword: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
};

export default ChangePasswordComponent;
