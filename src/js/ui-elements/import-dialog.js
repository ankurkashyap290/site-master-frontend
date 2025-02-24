import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  TextField,
  FormHelperText,
  Typography,
} from '@material-ui/core';

class ImportDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      file: null,
      errors: null,
    };
    this.onImport = this.onImport.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onImport() {
    this.setState({ loading: true, errors: null });
    this.props.onImport(this.state.file)
      .then(() => {
        this.onClose();
      })
      .catch((error) => {
        this.setState({ errors: error.response.data.errors, loading: false });
        this.props.updateModelList();
      });
  }

  onChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  onClose() {
    this.setState({ loading: false, file: null, errors: null });
    this.props.updateModelList();
    this.props.onClose();
  }

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.onClose}
      >
        <DialogTitle id="alert-dialog-title">Import {this.props.title} from CSV</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.props.description}
          </DialogContentText>
          <TextField type="file" onChange={this.onChange} />
          {this.state.errors && (this.state.errors[0].source.pointer !== 'csv') ?
            <div className="import-error-list">
              <Typography color="error">
                Has following errors occured, when importing the file:
              </Typography>
              {map(this.state.errors, e => (
                <div key={e.source.pointer}>
                  <FormHelperText error>{e.detail}</FormHelperText>
                  <FormHelperText>{e.source.pointer}</FormHelperText>
                </div>
              ))}
            </div> : ''}
          {this.state.errors && this.state.errors[0].source.pointer === 'csv' ? <FormHelperText error>{this.state.errors[0].detail}</FormHelperText> : ''}
        </DialogContent>
        <DialogActions>
          {this.state.loading ? <CircularProgress color="secondary" className="smallCircularProgress" /> : null}
          <Button onClick={this.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onImport} color="secondary" autoFocus disabled={this.state.loading || this.state.file === null}>
            Import
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ImportDialog.defaultProps = {
  title: '',
  description: '',
};

ImportDialog.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  updateModelList: PropTypes.func.isRequired,
};

export default ImportDialog;
