import { connect } from 'react-redux';

import { setEditableModel, setDeletableModel } from 'facilities/store/actions';
import RowComponent from '../components/row';

const mapDispatchToProps = dispatch => ({
  setEditableModel: data => dispatch(setEditableModel(data)),
  setDeletableModel: data => dispatch(setDeletableModel(data)),
});

const Row = connect(
  null,
  mapDispatchToProps,
)(RowComponent);

export default Row;
