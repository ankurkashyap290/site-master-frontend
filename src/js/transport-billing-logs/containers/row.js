import { connect } from 'react-redux';

import { setEditableModel, setDeletableModel, showDetails } from 'transport-billing-logs/store/actions';
import RowComponent from '../components/row';

const mapDispatchToProps = dispatch => ({
  setEditableModel: data => dispatch(setEditableModel(data)),
  setDeletableModel: data => dispatch(setDeletableModel(data)),
  showDetails: data => dispatch(showDetails(data)),
});

const Row = connect(
  null,
  mapDispatchToProps,
)(RowComponent);

export default Row;
