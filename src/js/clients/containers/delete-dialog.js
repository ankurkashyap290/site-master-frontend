import { connect } from 'react-redux';

import DeleteDialogComponent from 'ui-elements/delete-dialog';
import { deleteModel, setDeletableModel } from 'clients/store/actions';

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteModel(id)),
  onClose: () => dispatch(setDeletableModel(null)),
});

const mapStateToProps = ({ clientReducer }) => ({
  isOpen: clientReducer.deletableModel !== null,
  deletableModel: clientReducer.deletableModel,
  title:
    clientReducer.deletableModel &&
    `${clientReducer.deletableModel.attributes.first_name} ${clientReducer.deletableModel.attributes.last_name}`,
  description: 'This action will permanently remove the client from the system.',
});

const DeleteDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialogComponent);

export default DeleteDialog;
