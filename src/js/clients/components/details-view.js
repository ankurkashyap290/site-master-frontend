import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
} from '@material-ui/core';

import { fullNameAdapter } from '../../store/adapters';
import { rruleFromStringAdapter, eventBgColor } from '../../calendar/store/adapters';
import dateformats from '../../config/dateformats';
import LocationView from '../../ui-elements/location-view';
import colorContrast from '../../common/color-contrast';

const formatDate = date => moment(date, dateformats.dbDateFormat)
  .format(dateformats.dateFormat);

const formatTime = time => moment(time, dateformats.dbTimeFormat)
  .format(dateformats.timeFormat);

const DetailsViewComponent = ({ modelDetails, showDetails }) => {
  if (!modelDetails) {
    return null;
  }

  let eventStyle = {};
  if (modelDetails.attributes.transport_status === 'on') {
    const { accepted_driver: acceptedDriver } = modelDetails.attributes.ongoing_event;
    const bgColor = eventBgColor(acceptedDriver);
    eventStyle = {
      backgroundColor: `#${bgColor}`,
      color: `${colorContrast(bgColor)}`,
      padding: 14,
    };
  }
  return (
    <Dialog
      open
      onClose={() => showDetails(null)}
      className="etc-details"
    >
      <DialogTitle id="alert-dialog-title">{fullNameAdapter(modelDetails.attributes)}</DialogTitle>
      <DialogContent>
        <Typography className="detail-row">
          <span className="label">Room #</span>
          {modelDetails.attributes.room_number}
        </Typography>
        {modelDetails.attributes.responsible_party_email ?
          <Typography className="detail-row">
            <span className="label">Responsible Party Email</span>
            {modelDetails.attributes.responsible_party_email}
          </Typography>
        : null}
        <Typography className="detail-row">
          <span className="label">Transport Status</span>
          {`${modelDetails.attributes.transport_status} transport`}
        </Typography>
        {(modelDetails.attributes.transport_status === 'on') ?
          <Paper>
            <div className="actions" style={eventStyle}>
              <Typography variant="subheading" style={{ fontWeight: 'bold' }}>
                {modelDetails.attributes.ongoing_event.name}
              </Typography>
              <Typography>
                {`${formatDate(modelDetails.attributes.ongoing_event.date)}, `}
                {`${formatTime(modelDetails.attributes.ongoing_event.start_time)} - ${formatTime(modelDetails.attributes.ongoing_event.end_time)}`}
              </Typography>
              {modelDetails.attributes.ongoing_event.rrule ?
                <Typography>
                  {rruleFromStringAdapter(modelDetails.attributes.ongoing_event.rrule).toText()}
                </Typography>
              : null}
            </div>
            <div style={{ padding: '0 14px 14px 28px' }}>
              {modelDetails.attributes.ongoing_event.passengers
                .filter(passenger => Number(passenger.client_id) === Number(modelDetails.id))
                .map(passenger => passenger.appointments.map(appointment => (
                  <Typography key={appointment.id} style={{ marginTop: 12 }}>
                    <span style={{ fontWeight: 'bold', opacity: 0.8 }}>
                      {`${formatTime(appointment.time)} @ ${appointment.location.name}`}
                    </span>
                    <br />
                    <LocationView locationAttributes={appointment.location} />
                  </Typography>
                )))}
            </div>
          </Paper>
        : null}
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
