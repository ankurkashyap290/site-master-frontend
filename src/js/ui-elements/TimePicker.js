import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import moment from 'moment';
import { cloneDeep } from 'lodash';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  Button,
} from '@material-ui/core';

const styles = theme => ({
  dialogTitle: {
    background: theme.palette.primary[500],
    minWidth: '350px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTime: {
    color: theme.palette.primary.contrastText,
    fontSize: '2.125rem',
    fontWeight: '400',
  },
  selects: {
    display: 'flex',
    columnDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
  },
  select: {
    maxHeight: '100px',
    width: '25%',
    overflowY: 'scroll',
    margin: '30px 0',
  },
  listItem: {
    textAlign: 'center',
    cursor: 'pointer',
  },
  listItemSelected: {
    textAlign: 'center',
    cursor: 'pointer',
    color: theme.palette.primary[500],
    fontWeight: 'bold',
  },
});

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/[0-1]/, /[0-9]/, ':', /[0-5]/, /[0-9]/, ' ', /[A,P,a,p]/, 'M']}
      placeholderChar={'\u2000'}
    />
  );
};

const TimePickerDialog = props => (
  <Dialog open onClose={props.onClose} className="typography">
    <DialogTitle disableTypography className={props.classes.dialogTitle}>
      <Typography variant="headline" className={props.classes.selectedTime}>
        Set time
      </Typography>
    </DialogTitle>
    <DialogContent className={props.classes.selects}>
      <List className={props.classes.select}>
        <Divider light />
        {Array.from(new Array(12), (x, i) => i + 1).map(item => (
          <ListItem
            className={props.hour === item ?
              props.classes.listItemSelected :
              props.classes.listItem
            }
            onClick={() => props.setHour(item)}
            divider
            key={item}
          >
            {item < 10 ? `0${item}` : item}
          </ListItem>
        ))}
      </List>
      <List className={props.classes.select}>
        <Divider light />
        {Array.from(new Array(60), (x, i) => i).map(item => (
          <ListItem
            className={props.minute === item ?
              props.classes.listItemSelected :
              props.classes.listItem
            }
            onClick={() => props.setMinute(item)}
            divider
            key={item}
          >
            {item < 10 ? `0${item}` : item}
          </ListItem>
        ))}
      </List>
      <List className={props.classes.select}>
        <Divider light />
        {['AM', 'PM'].map(item => (
          <ListItem
            className={props.ampm === item ?
              props.classes.listItemSelected :
              props.classes.listItem
            }
            onClick={() => props.setAMPM(item)}
            divider
            key={item}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => {
          props.setHour('');
          props.onClose();
        }}
        color="primary"
      >
        Cancel
      </Button>
      <Button onClick={props.onClose} color="primary" autoFocus>
        Set
      </Button>
    </DialogActions>
  </Dialog>
);

TimePickerDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  minute: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  hour: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  ampm: PropTypes.string.isRequired,
  setHour: PropTypes.func.isRequired,

};

const TimeDialog = withStyles(styles)(TimePickerDialog);

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.toggleTimePicker = this.toggleTimePicker.bind(this);
    this.setMinute = this.setMinute.bind(this);
    this.setHour = this.setHour.bind(this);
    this.setAMPM = this.setAMPM.bind(this);
    this.state = {
      error: '',
      showTimePicker: false,
      ampm: (props.value && (props.value.hour() >= 12 ? 'PM' : 'AM')) || '',
      hour: (props.value && parseInt(props.value.format('h'), 10)) || '',
      minute: (props.value && props.value.minute()) || '',
      selectedTime: props.value,
    };
  }

  setHour(hour) {
    if (!hour) {
      this.props.onChange(null);
      return this.setState({
        error: '',
        ampm: '',
        hour: '',
        minute: '',
        selectedTime: null,
      });
    }
    const newTime = this.state.selectedTime ? cloneDeep(this.state.selectedTime) : moment();
    newTime.hour(hour);
    this.props.onChange(newTime);
    return this.setState({
      selectedTime: newTime,
      hour,
      error: '',
    });
  }

  setAMPM(type) {
    const newTime = this.state.selectedTime ? cloneDeep(this.state.selectedTime) : moment();
    const currentType = newTime.hour() >= 12 ? 'PM' : 'AM';
    if (currentType === type) {
      this.setState({
        ampm: type,
        error: '',
      });
      return;
    }
    if (type === 'AM') {
      newTime.subtract(12, 'hours');
    }
    if (type === 'PM') {
      newTime.add(12, 'hours');
    }
    this.setState({
      ampm: type,
      selectedTime: newTime,
      error: '',
    });
    this.props.onChange(newTime);
  }

  setMinute(minute) {
    const newTime = this.state.selectedTime ? cloneDeep(this.state.selectedTime) : moment();
    newTime.minute(minute);
    this.setState({
      selectedTime: newTime,
      minute,
      error: '',
    });
    this.props.onChange(newTime);
  }

  handleChange(event) {
    const { value } = event.target;
    const newTime = moment(value, 'hh:mm A');
    if (/[0-1][0-9]:[0-5][0-9]\s[A,P,a,p]M/.test(value)) {
      this.setState({
        selectedTime: newTime,
        error: '',
        hour: newTime.hour(),
        minute: newTime.minute(),
        ampm: newTime.hour() >= 12 ? 'PM' : 'AM',
      });
      this.props.onChange(newTime);
      return;
    }
    this.props.onChange(null);
    this.setState({ selectedTime: value.length ? newTime : null, error: value.length ? 'Invalid time format' : '' });
  }

  toggleTimePicker() {
    this.setState(state => ({ showTimePicker: !state.showTimePicker }));
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showTimePicker && <TimeDialog
          hour={this.state.hour}
          minute={this.state.minute}
          ampm={this.state.ampm}
          onClose={this.toggleTimePicker}
          setHour={this.setHour}
          setMinute={this.setMinute}
          setAMPM={this.setAMPM}
        />}
        <FormControl
          className="form-control"
          fullWidth={this.props.fullWidth}
          error={Boolean(this.state.error.length || this.props.error)}
        >
          <InputLabel htmlFor="time-picker-input">{this.props.label}</InputLabel>
          <Input
            fullWidth={this.props.fullWidth}
            value={this.state.selectedTime ? this.state.selectedTime.format(this.props.format) : ' '}
            name={this.props.name}
            onBlur={this.handleChange}
            id="time-picker-input"
            inputComponent={TextMaskCustom}
            endAdornment={<IconButton position="end" onClick={this.toggleTimePicker}><Icon>alarm_add</Icon></IconButton>}
          />
          <FormHelperText>{`${this.state.error} ${this.props.helperText}`}</FormHelperText>
        </FormControl>
      </React.Fragment>
    );
  }
}

TimePicker.defaultProps = {
  fullWidth: true,
  value: null,
  error: false,
  helperText: '',
  onChange: () => {},
  format: 'hh:mm A',
};

TimePicker.propTypes = {
  fullWidth: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func,
  format: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default TimePicker;
