import { connect } from 'react-redux';

import { setEditableModel, setResetableModel, setDeletableModel } from 'users/store/actions';
import RowComponent from '../components/row';

const mapDispatchToProps = dispatch => ({
  setEditableModel: data => dispatch(setEditableModel(data)),
  setResetableModel: data => dispatch(setResetableModel(data)),
  setDeletableModel: data => dispatch(setDeletableModel(data)),
});

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
});

const Row = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RowComponent);

export default Row;
