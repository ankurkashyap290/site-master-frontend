import { connect } from 'react-redux';

import DeleteDialogComponent from 'ui-elements/delete-dialog';
import { deleteModel, setDeletableModel } from 'users/store/actions';

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteModel(id)),
  onClose: () => dispatch(setDeletableModel(null)),
});

const mapStateToProps = ({ userReducer }) => ({
  isOpen: userReducer.deletableModel !== null,
  deletableModel: userReducer.deletableModel,
  title:
    userReducer.deletableModel &&
    `${userReducer.deletableModel.attributes.first_name} ${userReducer.deletableModel.attributes.last_name}`,
  description: 'This action will permanently remove the user from the system.',
});

const DeleteDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialogComponent);

export default DeleteDialog;
