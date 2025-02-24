import { connect } from 'react-redux';

import ConfirmDialogComponent from 'ui-elements/confirm-dialog';
import { resetPassword, setResetableModel } from '../store/actions';

const mapDispatchToProps = dispatch => ({
  onConfirm: id => dispatch(resetPassword(id)),
  onClose: () => dispatch(setResetableModel(null)),
});

const mapStateToProps = ({ userReducer }) => ({
  isOpen: userReducer.resetableModel !== null,
  title: userReducer.resetableModel && `Reset password for ${userReducer.resetableModel.attributes.name}`,
  description: 'This will disable the login for the user and send a new activation email to them. Are you sure?',
  acceptTitle: 'Reset Password',
  editableModel: userReducer.resetableModel,
});

const ConfirmDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmDialogComponent);

export default ConfirmDialog;
