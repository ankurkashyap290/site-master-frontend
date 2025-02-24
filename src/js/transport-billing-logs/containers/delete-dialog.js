import { connect } from 'react-redux';

import DeleteDialogComponent from 'ui-elements/delete-dialog';
import { deleteModel, setDeletableModel } from 'transport-billing-logs/store/actions';

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteModel(id)),
  onClose: () => dispatch(setDeletableModel(null)),
});

const mapStateToProps = ({ transportBillingLogReducer }) => ({
  isOpen: transportBillingLogReducer.deletableModel !== null,
  deletableModel: transportBillingLogReducer.deletableModel,
  title: transportBillingLogReducer.deletableModel
    && transportBillingLogReducer.deletableModel.attributes.location_name,
  description: 'This action can not be undone.',
});

const DeleteDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialogComponent);

export default DeleteDialog;
