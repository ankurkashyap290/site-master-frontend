import { connect } from 'react-redux';

import { setEditableModel, setDeletableModel } from 'organizations/store/actions';
import RowComponent from '../components/row';

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: data => dispatch(setEditableModel(data)),
  setDeletableModel: data => dispatch(setDeletableModel(data)),
});

const Row = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RowComponent);

export default Row;
