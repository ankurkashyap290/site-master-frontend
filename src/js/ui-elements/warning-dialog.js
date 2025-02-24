import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

class WarningDialog extends React.Component {
  render() {
    return (
      <Dialog
        open
        onClose={this.props.onClose}
      >
        <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

WarningDialog.defaultProps = {
  onClose: () => {},
};

WarningDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default WarningDialog;
