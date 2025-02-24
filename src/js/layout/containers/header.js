import { connect } from 'react-redux';
import HeaderComponent from '../components/header';

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
});

const Header = connect(
  mapStateToProps,
  null,
)(HeaderComponent);

export default Header;
