import { connect } from 'react-redux';

import DeleteDialogComponent from 'ui-elements/delete-dialog';
import { deleteModel, setDeletableModel } from 'etcs/store/actions';

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteModel(id)),
  onClose: () => dispatch(setDeletableModel(null)),
});

const mapStateToProps = ({ etcReducer }) => ({
  isOpen: etcReducer.deletableModel !== null,
  deletableModel: etcReducer.deletableModel,
  title: etcReducer.deletableModel && etcReducer.deletableModel.attributes.name,
  description: 'This action will permanently remove the External Transportaion Company from the system.',
});

const DeleteDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialogComponent);

export default DeleteDialog;
