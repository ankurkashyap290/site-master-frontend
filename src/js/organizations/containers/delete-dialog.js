import { connect } from 'react-redux';

import DeleteDialogComponent from 'ui-elements/delete-dialog';
import { deleteModel, setDeletableModel } from 'organizations/store/actions';

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteModel(id)),
  onClose: () => dispatch(setDeletableModel(null)),
});

const mapStateToProps = ({ organizationReducer }) => ({
  isOpen: organizationReducer.deletableModel !== null,
  deletableModel: organizationReducer.deletableModel,
  title: organizationReducer.deletableModel && organizationReducer.deletableModel.attributes.name,
  description: 'This action will permanently remove the organization from the system and disable the access of all users in the organization.',
});

const DeleteDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialogComponent);

export default DeleteDialog;
