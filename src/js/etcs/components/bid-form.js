import React from 'react';
import PropTypes from 'prop-types';

import TimePicker from 'ui-elements/TimePicker';
import { FormControl, Input, InputLabel, Button } from '@material-ui/core';

import dateformats from '../../config/dateformats';
import NumericInput from '../../ui-elements/numeric-input';
import NumberFormatFee from '../../ui-elements/input-formats/number-format-fee';

const BidForm = (props) => {
  if (!props.editableModel.attributes.fee && props.editableModel.attributes.status !== 'pending') {
    return null;
  }
  const readonly = props.editableModel.attributes.status !== 'pending';
  return (
    <div className="bid-form">
      {readonly ?
        <FormControl className="form-control">
          <InputLabel>Pickup Time</InputLabel>
          <Input
            value={props.editableModel.attributes.pickup_time.format(dateformats.timeFormat)}
            disabled
          />
        </FormControl> :
        <TimePicker
          label="Pickup Time"
          format={dateformats.timeFormat}
          value={props.editableModel.attributes.pickup_time}
          onChange={props.setTime}
        />}
      <NumericInput
        {...props}
        className="numeric-input"
        name="fee"
        label="Transport Fee"
        startAdornment="$"
        disabled={readonly}
        handleEnter={props.onEnter}
        format={NumberFormatFee}
      />
      <div style={{ textAlign: 'center' }}>
        <Button onClick={props.onSave} color="secondary" variant="raised" disabled={readonly}>Save My Bid</Button>
      </div>
    </div>
  );
};

BidForm.defaultProps = {
  headline: '',
};

BidForm.propTypes = {
  editableModel: PropTypes.object.isRequired,
  headline: PropTypes.string,
  setTime: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
};

export default BidForm;
