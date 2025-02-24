import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormHelperText,
  FormControlLabel,
  MenuItem,
  DialogActions,
  Button,
  TextField,
  Select,
  RadioGroup,
  Radio,
  Checkbox,
} from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import dateformats from '../../config/dateformats';

const RecurrenceDialogComponent = (props) => {
  if (!props.rrule) {
    return null;
  }
  return (
    <Dialog
      open
      onClose={props.onDiscard}
      className="recurrence-dialog"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Recurrence
      </DialogTitle>
      <DialogContent>
        <FormGroup className="select">
          <FormHelperText>Repeat every</FormHelperText>
          <div className="flex-row">
            <TextField
              name="interval"
              onChange={props.onChange}
              value={props.rrule.options.interval}
              className="numeric-input"
              style={{ width: '40px' }}
              error={Boolean(props.errors['data.attributes.rrule.options.interval'])}
            />
            <Select
              name="freq"
              onChange={props.onChange}
              value={props.rrule.options.freq}
              style={{ marginLeft: '12px', width: '80px' }}
            >
              <MenuItem value={3}>day</MenuItem>
              <MenuItem value={2}>week</MenuItem>
              <MenuItem value={1}>month</MenuItem>
              <MenuItem value={0}>year</MenuItem>
            </Select>
          </div>
          {props.errors['data.attributes.rrule.options.interval'] ?
            <FormHelperText error>{props.errors['data.attributes.rrule.options.interval'].detail}</FormHelperText> : null}
        </FormGroup>
        {(props.rrule.options.freq === 2 && props.rrule.options.byweekday) ?
          <div>
            <FormHelperText>Repeat on</FormHelperText>
            <Checkbox
              checked={props.rrule.options.byweekday.includes(6)}
              value="6"
              onChange={props.onByWeekdayChange}
              icon={<span className="dow-selector">S</span>}
              checkedIcon={<span className="dow-selector active">S</span>}
            />
            {['M', 'T', 'W', 'T', 'F', 'S']
            .map((day, id) =>
              (<Checkbox
                // eslint-disable-next-line react/no-array-index-key
                key={id}
                checked={props.rrule.options.byweekday.includes(id)}
                value={`${id}`}
                onChange={props.onByWeekdayChange}
                icon={<span className="dow-selector">{day}</span>}
                checkedIcon={<span className="dow-selector active">{day}</span>}
              />))}
          </div>
        : null}
        <FormGroup className="select">
          <FormHelperText>Ends</FormHelperText>
          <RadioGroup>
            <FormControlLabel
              value="never"
              control={<Radio color="primary" checked={props.ends === 'never'} />}
              label="Never"
              onClick={() => props.onEndsChange('never')}
            />
            <FormControlLabel
              value="on"
              control={<Radio color="primary" checked={props.ends === 'on'} />}
              label={
                <span>
                  {'On '}
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <span className="picker">
                      <DatePicker
                        keyboard
                        showTodayButton
                        disablePast
                        minDateMessage="Date must not be in the past"
                        name="until"
                        value={props.until}
                        onChange={props.onUntilChange}
                        disabled={props.ends !== 'on'}
                        format={dateformats.dateFormat}
                        mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                      />
                    </span>
                  </MuiPickersUtilsProvider>
                </span>
              }
              onClick={() => props.onEndsChange('on')}
            />
            <FormControlLabel
              value="after"
              control={<Radio color="primary" checked={props.ends === 'after'} />}
              label={
                <div>
                  {'After '}
                  <TextField
                    name="count"
                    onChange={props.onCountChange}
                    value={props.count}
                    disabled={props.ends !== 'after'}
                    className="numeric-input"
                    style={{ width: '40px' }}
                  />
                  {' occurrences'}
                </div>
              }
              onClick={() => props.onEndsChange('after')}
            />
          </RadioGroup>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onDiscard}>Cancel</Button>
        <Button color="secondary" onClick={props.onSave}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};

RecurrenceDialogComponent.defaultProps = {
  rrule: null,
};

RecurrenceDialogComponent.propTypes = {
  rrule: PropTypes.object,
  ends: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  until: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onByWeekdayChange: PropTypes.func.isRequired,
  onEndsChange: PropTypes.func.isRequired,
  onUntilChange: PropTypes.func.isRequired,
  onCountChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
};

export default RecurrenceDialogComponent;
