import { connect } from 'react-redux';

import DeleteDialogComponent from 'ui-elements/delete-dialog';
import { deleteModel, setDeletableModel } from 'locations/store/actions';

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteModel(id)),
  onClose: () => dispatch(setDeletableModel(null)),
});

const mapStateToProps = ({ locationReducer }) => ({
  isOpen: locationReducer.deletableModel !== null,
  deletableModel: locationReducer.deletableModel,
  title: locationReducer.deletableModel && locationReducer.deletableModel.attributes.name,
  description: 'This action can not be undone.',
});

const DeleteDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialogComponent);

export default DeleteDialog;
