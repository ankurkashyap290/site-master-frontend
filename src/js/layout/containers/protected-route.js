import { connect } from 'react-redux';
import ProtectedRouteComponent from '../components/protected-route';

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
});

const ProtectedRoute = connect(
  mapStateToProps,
  null,
)(ProtectedRouteComponent);

export default ProtectedRoute;
