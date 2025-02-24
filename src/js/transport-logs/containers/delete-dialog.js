import { connect } from 'react-redux';

import DeleteDialogComponent from 'ui-elements/delete-dialog';
import { deleteModel, setDeletableModel } from 'transport-logs/store/actions';

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteModel(id)),
  onClose: () => dispatch(setDeletableModel(null)),
});

const mapStateToProps = ({ transportLogReducer }) => ({
  isOpen: transportLogReducer.deletableModel !== null,
  deletableModel: transportLogReducer.deletableModel,
  title: transportLogReducer.deletableModel
    && transportLogReducer.deletableModel.attributes.location_name,
  description: 'This action can not be undone.',
});

const DeleteDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialogComponent);

export default DeleteDialog;
