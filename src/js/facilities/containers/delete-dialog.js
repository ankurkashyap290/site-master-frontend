import { connect } from 'react-redux';

import DeleteDialogComponent from 'ui-elements/delete-dialog';
import { deleteModel, setDeletableModel } from 'facilities/store/actions';

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteModel(id)),
  onClose: () => dispatch(setDeletableModel(null)),
});

const mapStateToProps = ({ facilityReducer }) => ({
  isOpen: facilityReducer.deletableModel !== null,
  deletableModel: facilityReducer.deletableModel,
  title: facilityReducer.deletableModel && facilityReducer.deletableModel.attributes.name,
  description: 'This action will permanently remove the facility from the system and disable the access of all users in the facility.',
});

const DeleteDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialogComponent);

export default DeleteDialog;
