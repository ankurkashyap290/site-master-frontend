import { connect } from 'react-redux';
import LoginComponent from '../components/login';
import { login } from '../store/actions';

const mapDispatchToProps = dispatch => ({
  login: (username, password) =>
    dispatch(login(username, password)),
});

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
  loginError: authReducer.loginError,
  accessToken: authReducer.accessToken,
});

const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);

export default Login;
