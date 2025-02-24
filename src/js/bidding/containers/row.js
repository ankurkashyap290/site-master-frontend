import { connect } from 'react-redux';

import { setEditableModel } from '../store/actions';
import RowComponent from '../components/row';

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: data => dispatch(setEditableModel(data)),
});

const Row = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RowComponent);

export default Row;
