import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  FormHelperText,
} from '@material-ui/core';

class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errors: null,
    };
    this.onConfirm = this.onConfirm.bind(this);
  }

  onConfirm() {
    this.setState({ loading: true });
    this.props.onConfirm(this.props.editableModel.id)
      .then(() => this.setState({ loading: false }))
      .catch(errors => this.setState({ loading: false, errors }));
  }

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.onClose}
      >
        <DialogTitle id="alert-dialog-title">{this.props.title}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.description}
          </DialogContentText>
          {this.state.errors && this.state.errors[0] ?
            <FormHelperText error>{this.state.errors[0].detail}</FormHelperText>
          : null}
        </DialogContent>
        <DialogActions>
          {this.state.loading ? <CircularProgress color="secondary" className="smallCircularProgress" /> : null}
          <Button onClick={this.onConfirm} color="secondary" autoFocus disabled={this.state.loading}>
            {this.props.acceptTitle}
          </Button>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmDialog.defaultProps = {
  editableModel: null,
  title: '',
  acceptTitle: 'Confirm',
  description: '',
};

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  acceptTitle: PropTypes.string,
  description: PropTypes.string,
  editableModel: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmDialog;
