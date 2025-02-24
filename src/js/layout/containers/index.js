import { connect } from 'react-redux';
import { login } from '../../auth/store/actions';
import LayoutComponent from '../components';

const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    dispatch(login(username, password));
  },
});

const LayoutContainer = connect(
  null,
  mapDispatchToProps,
)(LayoutComponent);

export default LayoutContainer;
