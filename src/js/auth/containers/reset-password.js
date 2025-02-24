import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ResetPasswordComponent from '../components/reset-password';
import { resetPassword } from '../store/actions';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordError: '',
      password: '',
      passwordConfirm: '',
      done: false,
    };

    this.resetPassword = this.resetPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  resetPassword() {
    if (this.validate()) {
      this.props.resetPassword(this.props.match.params.token, this.state.password)
        .then(() => {
          if (!this.props.resetPasswordError) {
            this.setState({ done: true });
          }
        });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.forgotPassword();
    }
  }

  validate() {
    let passwordError = '';
    if (!this.state.password) {
      passwordError = 'Required field!';
    } else if (this.state.password !== this.state.passwordConfirm) {
      passwordError = 'Passwords do not match!';
    }
    this.setState({ passwordError });
    return !passwordError.length;
  }

  render() {
    const error = this.props.resetPasswordError.length ?
      this.props.resetPasswordError : this.state.passwordError;
    return (
      <ResetPasswordComponent
        done={this.state.done}
        password={this.state.password}
        passwordConfirm={this.state.passwordConfirm}
        handleChange={this.handleChange}
        handleEnter={this.handleEnter}
        error={error}
        resetPassword={this.resetPassword}
      />
    );
  }
}

ResetPassword.defaultProps = {
  resetPasswordError: '',
};

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
  resetPasswordError: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  resetPassword: (token, password) => dispatch(resetPassword(token, password)),
});

const mapStateToProps = ({ authReducer }) => ({
  resetPasswordError: authReducer.resetPasswordError,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);
