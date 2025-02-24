import React from 'react';
import { Link as LinkTo } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Paper, Button, TextField, Typography } from '@material-ui/core';

const ResetPasswordComponent = props => (
  props.done ?
    <Paper className="standalone-form">
      <Typography paragraph variant="title">Your password has changed.</Typography>
      <Typography>Now you can log in with your brand new password!</Typography>
      <LinkTo to="/new-session" className="styleless">
        <Button variant="raised" color="primary">Go to login</Button>
      </LinkTo>
    </Paper> :
    <Paper className="standalone-form">
      <Typography>Please enter your new password.</Typography>
      <FormControl error={props.error.length !== 0}>
        <TextField
          autoFocus
          value={props.password}
          label="Password"
          type="password"
          name="password"
          onChange={props.handleChange}
          onKeyUp={props.handleEnter}
        />
        <FormHelperText id="name-error-text">{props.error}</FormHelperText>
      </FormControl>
      <FormControl error={Boolean(props.error)}>
        <TextField
          value={props.passwordConfirm}
          label="Password (confirm)"
          type="password"
          name="passwordConfirm"
          onChange={props.handleChange}
          onKeyUp={props.handleEnter}
        />
      </FormControl>
      <Button
        variant="raised"
        color="primary"
        onClick={props.resetPassword}
      >
        OK
      </Button>
    </Paper>
);

ResetPasswordComponent.propTypes = {
  done: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default ResetPasswordComponent;
