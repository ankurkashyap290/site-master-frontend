import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'ui-elements/loader';

import ActivationComponent from '../components/activation';
import { getActivableUser, activateUser } from '../store/actions';
import { userSkeleton } from '../../store/skeletons';

class Activation extends React.Component {
  constructor(props) {
    super(props);
    this.id = null;
    this.token = null;
    this.state = {
      loading: true,
      attributes: {
        password: '',
        passwordConfirm: '',
        termsOfConditions: false,
        privacyPolicy: false,
      },
      errors: {
      },
    };

    this.setErrorState = this.setErrorState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.activateUser = this.activateUser.bind(this);
  }

  componentDidMount() {
    this.id = parseInt(this.props.match.params.id, 10);
    this.token = this.props.match.params.token;
    this.props.getActivableUser(this.id, this.token).then(() => {
      this.setState({ loading: false });
    });
  }

  setErrorState(attribute, error) {
    const mergeErrors = Object.assign(
      {},
      {
        [attribute]: error,
      },
    );
    this.setState({ errors: mergeErrors });
  }

  handleChange(event) {
    const mergedAttributes = Object.assign(
      {},
      this.state.attributes,
      {
        [event.target.name]: (event.target.checked || event.target.value),
      },
    );
    this.setState({ attributes: mergedAttributes });
  }

  validator(attributes) {
    if (!attributes.password.length) {
      this.setErrorState('password', 'Password is required.');
      return false;
    }
    if (!attributes.passwordConfirm.length) {
      this.setErrorState('passwordConfirm', 'Password confirmation does not match.');
      return false;
    }
    if (!attributes.termsAndConditions) {
      this.setErrorState('termsAndConditions', 'Terms & Conditions must be accepted.');
      return false;
    }
    if (!attributes.privacyPolicy) {
      this.setErrorState('privacyPolicy', 'Privacy Policy must be accepted.');
      return false;
    }
    this.setState({
      errors: {},
    });
    return true;
  }

  activateUser(attributes) {
    if (!this.validator(attributes)) return;

    this.setState({ loading: true });
    this.props.activateUser(this.id, this.token, attributes.password)
      .then(() => { window.location.href = '/'; });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <ActivationComponent
        {...this}
        {...this.state}
        activableUser={this.props.activableUser}
        onActivate={this.activateUser}
      />
    );
  }
}

Activation.defaultProps = {
  activableUser: Object.assign({}, userSkeleton),
};

Activation.propTypes = {
  match: PropTypes.object.isRequired,
  activableUser: PropTypes.object,
  getActivableUser: PropTypes.func.isRequired,
  activateUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer }) => ({
  activableUser: authReducer.activableUser,
});

const mapDispatchToProps = dispatch => ({
  getActivableUser: (id, token) => dispatch(getActivableUser(id, token)),
  activateUser: (id, token, password) => dispatch(activateUser(id, token, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Activation);
