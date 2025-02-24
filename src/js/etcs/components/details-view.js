import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';

import colors from 'config/colors';
import LocationView from '../../ui-elements/location-view';

const DetailsViewComponent = ({ modelDetails, showDetails }) => {
  if (!modelDetails) {
    return null;
  }
  const background = `#${colors[modelDetails.attributes.color_id].value}`;

  return (
    <Dialog
      open
      onClose={() => showDetails(null)}
      className="etc-details"
    >
      <DialogTitle id="alert-dialog-title">{modelDetails.attributes.name}</DialogTitle>
      <DialogContent>
        <Typography className="detail-row content-below">
          <span className="label">Color</span>
        </Typography>
        <div className="detail-content">
          <div className="color-circle" style={{ background }} />
        </div>
        <Typography className="detail-row content-below">
          <span className="label">Emails</span>
        </Typography>
        <div className="detail-content emails">
          {modelDetails.attributes.emails.split(',').map(email => <Chip key={email} label={email} />)}
        </div>
        <Typography className="detail-row">
          <span className="label">Phone</span>
          {modelDetails.attributes.phone}
        </Typography>
        <Typography className="detail-row content-below">
          <span className="label">Location</span>
          {modelDetails.attributes.location ?
            <LocationView locationAttributes={modelDetails.attributes.location} />
          : '-'}
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
