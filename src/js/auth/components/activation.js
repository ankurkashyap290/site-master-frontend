import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Checkbox, Typography, FormControl, FormControlLabel, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { Link as LinkTo } from 'react-router-dom';

const ActivationComponent = props => (
  !props.activableUser.id ?
    <Paper className="standalone-form">
      <Typography variant="headline">
        Your activation URL is invalid.
      </Typography>
      <Typography paragraph>
        Please contact your organization administrator!
      </Typography>
    </Paper>
    :
    <Paper className="standalone-form">
      <Typography variant="headline">
        Welcome, {props.activableUser.attributes.first_name}!
      </Typography>
      <Typography paragraph>
        Please set up your password to start using Journey!
      </Typography>
      <FormControl error={Boolean(props.errors.password)}>
        <InputLabel>Password</InputLabel>
        <Input
          name="password"
          type="password"
          autoFocus
          value={props.attributes.password}
          onChange={props.handleChange}
        />
        <FormHelperText>{props.errors.password}</FormHelperText>
      </FormControl>
      <FormControl error={Boolean(props.errors.passwordConfirm)}>
        <InputLabel>Password Confirmation</InputLabel>
        <Input
          name="passwordConfirm"
          type="password"
          value={props.attributes.passwordConfirm}
          onChange={props.handleChange}
        />
        <FormHelperText>{props.errors.passwordConfirm}</FormHelperText>
      </FormControl>
      <FormControl
        error={Boolean(props.errors.termsAndConditions || props.errors.privacyPolicy)}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="termsAndConditions"
              color="primary"
              checked={props.attributes.termsAndConditions}
              onChange={props.handleChange}
            />
          }
          label={
            <span>
              I accept the&nbsp;
              <LinkTo to="/terms-and-conditions">Terms &amp; Conditions</LinkTo>
            </span>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              name="privacyPolicy"
              color="primary"
              checked={props.attributes.privacyPolicy}
              onChange={props.handleChange}
            />
          }
          label={
            <span>
              I accept the&nbsp;
              <LinkTo to="/privacy-policy">Privacy Policy</LinkTo>
            </span>
          }
        />
        <FormHelperText>
          {props.errors.termsAndConditions || props.errors.privacyPolicy}
        </FormHelperText>
      </FormControl>
      <Typography align="center">
        <Button
          color="primary"
          variant="raised"
          onClick={() => props.onActivate(props.attributes)}
        >
          Sign Up
        </Button>
      </Typography>
    </Paper>);

ActivationComponent.propTypes = {
  activableUser: PropTypes.object.isRequired,
  attributes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,

  handleChange: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
};

export default ActivationComponent;
