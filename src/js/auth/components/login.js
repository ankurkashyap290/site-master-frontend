import React from 'react';
import { Link as LinkTo } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Paper, TextField, Typography, Button } from '@material-ui/core';
import Loader from 'ui-elements/loader';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: '',
      passwordError: '',
      email: '',
      password: '',
    };

    this.login = this.login.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // reset form after successful login
    if (nextProps.loginError === '') {
      this.setState({ email: '', password: '' });
    }
  }

  login() {
    if (this.validate()) {
      this.props.login(this.state.email, this.state.password);
    }
  }

  validate() {
    let emailError = '';
    let passwordError = '';
    if (!this.state.email) {
      emailError = 'Required field!';
    }
    if (!this.state.password) {
      passwordError = 'Required field!';
    }
    this.setState({ emailError, passwordError });
    return emailError.length === 0 && passwordError.length === 0;
  }

  render() {
    const { journeyUser, loginError, accessToken } = this.props;
    const { passwordError } = this.state;
    let { emailError } = this.state;

    if (loginError) {
      emailError = loginError;
    }
    if (journeyUser.id) {
      return null;
    }
    if (!journeyUser.id && accessToken) {
      return <Loader />;
    }
    return (
      <Paper className="standalone-form">
        <FormControl error={emailError.length !== 0}>
          <TextField
            autoFocus
            value={this.state.email}
            id="name"
            label="Email"
            margin="normal"
            onChange={(e) => { this.setState({ email: e.target.value }); }}
            onKeyUp={(e) => { if (e.keyCode === 13) this.login(); }}
          />
          <FormHelperText id="name-error-text">{emailError}</FormHelperText>
        </FormControl>
        <FormControl error={passwordError.length !== 0}>
          <TextField
            id="password-input"
            label="Password"
            value={this.state.password}
            type="password"
            margin="normal"
            onChange={(e) => { this.setState({ password: e.target.value }); }}
            onKeyUp={(e) => { if (e.keyCode === 13) this.login(); }}
          />
          <FormHelperText id="name-error-text">{passwordError}</FormHelperText>
        </FormControl>
        <div className="spread">
          <Button variant="raised" color="primary" onClick={this.login}>
            Login
          </Button>
          <Typography>
            <LinkTo to="/forgot-password">Forgot password?</LinkTo>
          </Typography>
        </div>
      </Paper>
    );
  }
}

LoginComponent.defaultProps = {
  loginError: '',
  accessToken: null,
};

LoginComponent.propTypes = {
  login: PropTypes.func.isRequired,
  journeyUser: PropTypes.object.isRequired,
  loginError: PropTypes.string,
  accessToken: PropTypes.string,
};

export default LoginComponent;
