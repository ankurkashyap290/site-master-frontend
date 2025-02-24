import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';

import equipment from 'config/equipment';
import dateformats from 'config/dateformats';

const formatDate = date => moment(date, dateformats.dbDateTimeFormat)
  .format([dateformats.dateFormat, dateformats.timeFormat].join(' '));

const DetailsViewComponent = ({ modelDetails, showDetails }) => {
  if (!modelDetails) {
    return null;
  }
  return (
    <Dialog
      open
      onClose={() => showDetails(null)}
      className="log-details"
    >
      <DialogTitle id="alert-dialog-title">Transport Log #{modelDetails.id}</DialogTitle>
      <DialogContent>
        <Typography className="detail-row">
          <span className="label">Client Name</span>
          {modelDetails.attributes.client_name}
        </Typography>
        <Typography className="detail-row">
          <span className="label">Location Name</span>
          {modelDetails.attributes.location_name}
        </Typography>
        <Typography className="detail-row">
          <span className="label">Signature</span>
          {modelDetails.attributes.signature}
        </Typography>
        <Typography className="detail-row">
          <span className="label">Equipment Type</span>
          {equipment[modelDetails.attributes.equipment]}
        </Typography>
        <Typography className="detail-row">
          <span className="label">Equipment Secured</span>
          {modelDetails.attributes.equipment_secured ? 'Yes' : 'No'}
        </Typography>
        <Typography className="detail-row">
          <span className="label">Return Time</span>
          {formatDate(modelDetails.attributes.date)}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => showDetails(null)} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

DetailsViewComponent.defaultProps = {
  modelDetails: null,
};

DetailsViewComponent.propTypes = {
  modelDetails: PropTypes.object,
  showDetails: PropTypes.func.isRequired,
};

export default DetailsViewComponent;
