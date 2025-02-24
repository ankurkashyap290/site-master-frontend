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
} from '@material-ui/core';

class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.setState({ loading: true });
    this.props.onDelete(this.props.deletableModel.id)
      .then(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.onClose}
      >
        <DialogTitle id="alert-dialog-title">Delete {this.props.title}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {this.state.loading ? <CircularProgress color="secondary" className="smallCircularProgress" /> : null}
          <Button onClick={this.onDelete} color="secondary" autoFocus disabled={this.state.loading}>
            Delete
          </Button>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteDialog.defaultProps = {
  deletableModel: null,
  title: '',
  description: '',
};

DeleteDialog.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  deletableModel: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteDialog;
