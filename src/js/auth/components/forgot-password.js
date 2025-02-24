import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Paper, Button, TextField, Typography } from '@material-ui/core';
import { Link as LinkTo } from 'react-router-dom';

const ForgotPasswordComponent = props => (
  props.done ?
    <Paper className="standalone-form">
      <Typography paragraph variant="title">Password reset email has been sent.</Typography>
      <Typography>Check your mailbox for futher instructions.</Typography>
    </Paper> :
    <Paper className="standalone-form">
      <Typography paragraph>Please enter your email to reset your password.</Typography>
      <FormControl error={props.error.length !== 0}>
        <TextField
          autoFocus
          label="Email"
          name="email"
          value={props.email}
          onChange={props.handleChange}
          onKeyUp={props.handleEnter}
        />
        <FormHelperText id="email-error-text">{props.error}</FormHelperText>
      </FormControl>
      <div className="button-container">
        <LinkTo to="/new-session" className="styleless">
          <Button color="primary">
            Dismiss
          </Button>
        </LinkTo>
        <Button
          variant="raised"
          color="secondary"
          onClick={props.forgotPassword}
        >
          Continue
        </Button>
      </div>
    </Paper>
);

ForgotPasswordComponent.propTypes = {
  done: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  forgotPassword: PropTypes.func.isRequired,
};

export default ForgotPasswordComponent;
