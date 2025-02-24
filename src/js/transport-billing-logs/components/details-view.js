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

import equipment from '../../config/equipment';
import dateformats from '../../config/dateformats';
import transportType from '../../config/transport_type';
import NumberFormatFee from '../../ui-elements/input-formats/number-format-fee';
import NumberFormatMiles from '../../ui-elements/input-formats/number-format-miles';

const formatDate = date => moment(date, dateformats.dbDateTimeFormat)
  .format(dateformats.dateFormat);

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
      <DialogTitle id="alert-dialog-title">Transport Billing Log #{modelDetails.id}</DialogTitle>
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
          <span className="label">Destination Type</span>
          {modelDetails.attributes.destination_type}
        </Typography>
        <Typography className="detail-row">
          <span className="label">Transport Type</span>
          {transportType[modelDetails.attributes.transport_type]}
        </Typography>
        <Typography className="detail-row">
          <span className="label">Equipment Type</span>
          {equipment[modelDetails.attributes.equipment]}
        </Typography>
        <Typography className="detail-row">
          <span className="label">To Trip Destination Mileage</span>
        </Typography>
        <table className="mileage-table">
          <tbody>
            <tr>
              <th>Start</th>
              <td>
                <NumberFormatMiles value={modelDetails.attributes.mileage_to_start} displayType="text" />
                {' mile(s)'}
              </td>
            </tr>
            <tr>
              <th>End</th>
              <td>
                <NumberFormatMiles value={modelDetails.attributes.mileage_to_end} displayType="text" />
                {' mile(s)'}
              </td>
            </tr>
            <tr>
              <th>Total</th>
              <td>
                <NumberFormatMiles
                  value={
                    modelDetails.attributes.mileage_to_end -
                      modelDetails.attributes.mileage_to_start
                  }
                  displayType="text"
                />
                {' mile(s)'}
              </td>
            </tr>
          </tbody>
        </table>
        <Typography className="detail-row">
          <span className="label">Return Trip Destination Mileage</span>
        </Typography>
        <table className="mileage-table">
          <tbody>
            <tr>
              <th>Start</th>
              <td>
                <NumberFormatMiles value={modelDetails.attributes.mileage_return_start} displayType="text" />
                {' mile(s)'}
              </td>
            </tr>
            <tr>
              <th>End</th>
              <td>
                <NumberFormatMiles value={modelDetails.attributes.mileage_return_end} displayType="text" />
                {' mile(s)'}
              </td>
            </tr>
            <tr>
              <th>Total</th>
              <td>
                <NumberFormatMiles
                  value={
                    modelDetails.attributes.mileage_return_end -
                      modelDetails.attributes.mileage_return_start
                  }
                  displayType="text"
                />
                {' mile(s)'}
              </td>
            </tr>
          </tbody>
        </table>
        <Typography className="detail-row">
          <span className="label">Transport Fee</span>
          $<NumberFormatFee value={modelDetails.attributes.fee} displayType="text" />
        </Typography>
        <Typography className="detail-row">
          <span className="label">Date</span>
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
