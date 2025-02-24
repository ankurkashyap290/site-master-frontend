import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  IconButton,
  Icon,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import colorContrast from '../../common/color-contrast';
import dateformats from '../../config/dateformats';
import transportType from '../../config/transport_type';
import transportationType from '../../config/transportation_type';
import { rruleFromStringAdapter, eventBgColor, eventDriverName } from '../store/adapters';
import LocationView from '../../ui-elements/location-view';

const formatDate = date => moment(date, dateformats.dbDateFormat)
  .format(dateformats.dateFormat);

const formatTime = time => moment(time, dateformats.dbTimeFormat)
  .format(dateformats.timeFormat);

const DetailsViewComponent = ({
  modelDetails,
  showDetails,
  setEditableModel,
  setDeletableModel,
  journeyUser,
}) => {
  if (!modelDetails) {
    return null;
  }
  const { accepted_driver: acceptedDriver } = modelDetails.attributes;
  const driverName = eventDriverName(acceptedDriver);
  const bgColor = eventBgColor(acceptedDriver);
  const style = {
    backgroundColor: `#${bgColor}`,
    color: `${colorContrast(bgColor)}`,
  };
  return (
    <Dialog
      open
      onClose={() => showDetails(null)}
      className="event-details"
    >
      <div className="actions" style={style}>
        {journeyUser.isAllowed('delete', 'Calendar') ?
          <IconButton
            style={style}
            aria-label="delete"
            onClick={() => setDeletableModel(modelDetails)}
          >
            <Icon>delete</Icon>
          </IconButton>
        : null}
        <IconButton
          style={style}
          aria-label="close"
          onClick={() => showDetails(null)}
        >
          <Icon>close</Icon>
        </IconButton>
      </div>
      <DialogTitle className="title" style={style} disableTypography>
        <Typography variant="headline" style={style}>
          {modelDetails.attributes.name}
        </Typography>
        <Typography style={style}>
          {`${formatDate(modelDetails.attributes.date)}, `}
          {`${formatTime(modelDetails.attributes.start_time)} - ${formatTime(modelDetails.attributes.end_time)}`}
        </Typography>
        {journeyUser.isAllowed('update', 'Calendar') ?
          <Button
            style={style}
            className="fab"
            variant="fab"
            mini
            color="primary"
            aria-label="edit"
            onClick={() => setEditableModel(modelDetails)}
          >
            <Icon>mode_edit</Icon>
          </Button>
        : null}
      </DialogTitle>
      <DialogContent>
        <Typography>
          <span className="label">Passengers &amp; Appointments</span>
        </Typography>
        <div className="passenger-panel">
          {modelDetails.attributes.passengers
            .map(passenger => (
              <ExpansionPanel key={passenger.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography style={{ fontWeight: 'bold' }}>
                    {passenger.name + (passenger.room_number ? ` (room ${passenger.room_number})` : '')}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="passenger-details" style={{ display: 'block' }}>
                  {passenger.appointments.map(appointment => (
                    <div key={appointment.id} style={{ marginBottom: 20 }}>
                      <Typography style={{ fontWeight: 'bold', opacity: 0.8 }}>
                        {`${formatTime(appointment.time)} @ ${appointment.location.name}`}
                      </Typography>
                      <Typography>
                        <LocationView locationAttributes={appointment.location} />
                      </Typography>
                    </div>
                  ))}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
        </div>
        {modelDetails.attributes.rrule ?
          <Typography className="detail-row">
            <span className="label">Recurrence</span>
            {rruleFromStringAdapter(modelDetails.attributes.rrule).toText()}
          </Typography>
        : null}
        {modelDetails.attributes.location ?
          <Typography className="detail-row">
            <span className="label">From Location</span>
            <LocationView locationAttributes={modelDetails.attributes.location} />
          </Typography>
        : null}
        <Typography className="detail-row">
          <span className="label">Transport Type</span>
          {transportType[modelDetails.attributes.transport_type]}
        </Typography>
        {modelDetails.attributes.transportation_type ?
          <Typography className="detail-row">
            <span className="label">Transportation Type</span>
            {transportationType[modelDetails.attributes.transportation_type]}
          </Typography>
        : null}
        <Typography className="detail-row">
          <span className="label">Driver</span>
          { driverName }
        </Typography>
        <Typography className="detail-row">
          <span className="label">Description</span>
          { !modelDetails.attributes.description ? '-' : modelDetails.attributes.description }
        </Typography>
        <Typography className="detail-row">
          <span className="label">Created By</span>
          { `${modelDetails.attributes.user.first_name} ${modelDetails.attributes.user.middle_name} ${modelDetails.attributes.user.last_name}` }
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

DetailsViewComponent.defaultProps = {
  modelDetails: null,
};

DetailsViewComponent.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  modelDetails: PropTypes.object,
  showDetails: PropTypes.func.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  setDeletableModel: PropTypes.func.isRequired,
};

export default DetailsViewComponent;
