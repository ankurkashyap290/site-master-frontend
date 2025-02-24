import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ForgotPasswordComponent from '../components/forgot-password';
import { forgotPassword } from '../store/actions';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: '',
      email: '',
      done: false,
    };

    this.forgotPassword = this.forgotPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  forgotPassword() {
    if (this.validate()) {
      this.props.forgotPassword(this.state.email)
        .then(() => {
          if (!this.props.forgotPasswordError) {
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
    let emailError = '';
    if (!this.state.email) {
      emailError = 'Required field!';
    }
    this.setState({ emailError });
    return emailError.length === 0;
  }

  render() {
    const error = this.props.forgotPasswordError.length ?
      this.props.forgotPasswordError : this.state.emailError;
    return (
      <ForgotPasswordComponent
        done={this.state.done}
        handleChange={this.handleChange}
        handleEnter={this.handleEnter}
        email={this.state.email}
        error={error}
        forgotPassword={this.forgotPassword}
      />
    );
  }
}

ForgotPassword.defaultProps = {
  forgotPasswordError: '',
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  forgotPasswordError: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  forgotPassword: email => dispatch(forgotPassword(email)),
});

const mapStateToProps = ({ authReducer }) => ({
  forgotPasswordError: authReducer.forgotPasswordError,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
