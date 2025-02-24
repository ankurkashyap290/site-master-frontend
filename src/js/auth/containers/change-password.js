import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChangePasswordComponent from '../components/change-password';
import { changePassword } from '../store/actions';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      loading: false,
      error: '',
      oldPassword: '',
      password: '',
      passwordConfirm: '',
    };

    this.changePassword = this.changePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.discard = this.discard.bind(this);
  }

  changePassword() {
    if (this.validate()) {
      this.props.changePassword(this.state.oldPassword, this.state.password)
        .then(() => {
          if (!this.props.changePasswordError) {
            this.discard();
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
      this.changePassword();
    }
  }

  discard() {
    this.setState({
      done: false,
      loading: false,
      error: '',
      oldPassword: '',
      password: '',
      passwordConfirm: '',
    });
  }

  validate() {
    let error = '';
    if (!this.state.oldPassword) {
      error = 'Old password is required!';
    } else if (!this.state.password) {
      error = 'New password is required!';
    } else if (this.state.password !== this.state.passwordConfirm) {
      error = 'New passwords do not match!';
    }
    this.setState({ error });
    return !error.length;
  }

  render() {
    const error = this.props.changePasswordError.length ?
      this.props.changePasswordError : this.state.error;
    return (
      <ChangePasswordComponent
        done={this.state.done}
        loading={this.state.loading}
        oldPassword={this.state.oldPassword}
        password={this.state.password}
        passwordConfirm={this.state.passwordConfirm}
        handleChange={this.handleChange}
        handleEnter={this.handleEnter}
        error={error}
        onSave={this.changePassword}
        onDiscard={this.discard}
      />
    );
  }
}

ChangePassword.defaultProps = {
  changePasswordError: '',
};

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  changePasswordError: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  changePassword: (oldPassword, newPassword) => dispatch(changePassword(oldPassword, newPassword)),
});

const mapStateToProps = ({ authReducer }) => ({
  changePasswordError: authReducer.changePasswordError,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
