import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Radio,
  Drawer,
  CircularProgress,
  Button,
  FormHelperText,
  IconButton,
  Icon,
  Typography,
  FormControl,
} from '@material-ui/core';
import dateformats from '../../config/dateformats';
import NumberFormatFee from '../../ui-elements/input-formats/number-format-fee';

const AcceptFormComponent = props => (
  <Drawer className="sidebar-form" anchor="right" open={props.isOpen} onClose={props.onClose}>
    <div className="back-button-container">
      <IconButton
        onClick={props.onClose}
        color="primary"
        className="back-button"
      >
        <Icon>arrow_back</Icon>
      </IconButton>
      <Typography variant="title">Accept Driver</Typography>
    </div>
    <FormControl className="form-control">
      <Typography className="label">Event Name</Typography>
      <Typography>{props.editableModel.attributes.name}</Typography>
    </FormControl>
    <Table className="list">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>ETC Name</TableCell>
          <TableCell>Fee</TableCell>
          <TableCell>Requested Time</TableCell>
          <TableCell>Pickup Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.editableModel.attributes.drivers
        .map((driver) => {
          const pickupTime = moment(driver.pickup_time, 'H:m:s').format(dateformats.timeFormat);
          const startTime = moment(props.editableModel.attributes.start_time, 'H:m:s').format(dateformats.timeFormat);

          return driver.status === 'submitted' ?
            <TableRow
              key={driver.id}
              className={`clickable ${(pickupTime !== startTime ? ' row-warning' : '')}`}
              onClick={() => props.handleClick(driver.id)}
            >
              <TableCell padding="checkbox">
                <Radio checked={driver.id === props.selectedDriverId} />
              </TableCell>
              <TableCell>{driver.etc.name}</TableCell>
              <TableCell className="numeric">
                $<NumberFormatFee value={driver.fee} displayType="text" />
              </TableCell>
              <TableCell numeric className="numeric">
                {startTime}
              </TableCell>
              <TableCell className="numeric">
                {pickupTime}
              </TableCell>
            </TableRow>
            :
            <TableRow
              key={driver.id}
              className="disabled"
            >
              <TableCell padding="checkbox">
                <Radio disabled />
              </TableCell>
              <TableCell>{driver.etc.name}</TableCell>
              <TableCell colSpan={3} style={{ textAlign: 'center' }}>{driver.status}</TableCell>
            </TableRow>;
        })}
      </TableBody>
    </Table>
    <div className="button-container">
      {props.errors['driver.id'] ? <FormHelperText error>{props.errors['driver.id'].detail}</FormHelperText> : ''}
      {props.loading ? <CircularProgress color="secondary" className="smallCircularProgress" /> : null}
      <Button onClick={props.onDeclineAll} color="secondary" disabled={props.loading}>Decline All</Button>
      <Button onClick={props.onAccept} color="secondary" variant="raised" disabled={props.loading}>Accept</Button>
    </div>
  </Drawer>
);

AcceptFormComponent.defaultProps = {
  editableModel: null,
};

AcceptFormComponent.propTypes = {
  selectedDriverId: PropTypes.number.isRequired,
  // eslint-disable-next-line
  handleClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDeclineAll: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  editableModel: PropTypes.object,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AcceptFormComponent;
