import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  Typography,
  CircularProgress,
  Chip,
  Button,
  IconButton,
  Icon,
  Input,
  InputAdornment,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import NumberFormatFee from '../../ui-elements/input-formats/number-format-fee';

const UnassignFormComponent = props => (
  <Drawer className="sidebar-form" anchor="right" open={props.isOpen} onClose={props.onClose}>
    <div className="back-button-container">
      <IconButton
        onClick={props.onClose}
        color="primary"
        className="back-button"
      >
        <Icon>arrow_back</Icon>
      </IconButton>
      <Typography variant="title">Accepted Driver</Typography>
    </div>

    <FormControl className="form-control">
      <Typography className="label">Event Name</Typography>
      <Typography>{props.editableModel.attributes.name}</Typography>
    </FormControl>

    <FormControl className="form-control">
      <Typography className="label">Driver Name</Typography>
      <Typography>{props.editableModel.attributes.accepted_driver.name}</Typography>
    </FormControl>

    {props.emails ?
      <div>
        <Typography className="label">Emails</Typography>
        {props.emails.split(',')
          .map(email => <Chip key={email} label={email} style={{ marginRight: 6 }} />)}
      </div>
    : null}

    {props.editableModel.attributes.accepted_driver.details &&
      props.editableModel.attributes.accepted_driver.details.phone ?
        <FormControl className="form-control">
          <Typography className="label">Phone</Typography>
          <Typography>{props.editableModel.attributes.accepted_driver.details.phone}</Typography>
        </FormControl>
    : null}

    {props.editableModel.attributes.accepted_driver.fee !== null ?
      <FormControl className="form-control">
        <Typography className="label">Fee</Typography>
        <Input
          className="numeric-input"
          name="fee"
          value={props.acceptedDriverFee}
          onChange={props.onChange}
          onKeyUp={props.onEnter}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          inputComponent={NumberFormatFee}
        />
        {props.errors['data.attributes.fee'] ? <FormHelperText error>{props.errors['data.attributes.fee'].detail}</FormHelperText> : null}
      </FormControl>
    : null}

    <div className="button-container">
      {props.loading ? <CircularProgress color="secondary" className="smallCircularProgress" /> : null}
      <Button onClick={props.onDeclineAll} color="secondary" disabled={props.loading}>Unassign Driver</Button>
      <Button onClick={props.onSave} color="secondary" variant="raised" disabled={props.loading}>Save</Button>
    </div>
  </Drawer>
);

UnassignFormComponent.defaultProps = {
  editableModel: null,
  acceptedDriverFee: 0,
  emails: null,
};

UnassignFormComponent.propTypes = {
  editableModel: PropTypes.object,
  errors: PropTypes.object.isRequired,
  acceptedDriverFee: PropTypes.any,
  emails: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDeclineAll: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default UnassignFormComponent;
