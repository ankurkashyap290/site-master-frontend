import { connect } from 'react-redux';
import MenuComponent from '../components/menu';

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
});

const Menu = connect(
  mapStateToProps,
  null,
)(MenuComponent);

export default Menu;
