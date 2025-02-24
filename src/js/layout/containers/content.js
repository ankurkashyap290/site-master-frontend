import { connect } from 'react-redux';

import { getUser, logout } from 'auth/store/actions';
import ContentComponent from '../components/content';

const loggedOutPaths = [
  'reset-password',
  'activation',
  'etc-bid',
];

/* eslint-disable-next-line */
const isLogoutPath = () => loggedOutPaths.filter(path => location.pathname.indexOf(path) > -1).length > 0;

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => {
    if (isLogoutPath()) {
      dispatch(logout()).then(() => dispatch(getUser()));
      return;
    }
    dispatch(getUser());
  },
});

const Content = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentComponent);

export default Content;
