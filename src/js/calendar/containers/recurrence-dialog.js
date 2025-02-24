import React from 'react';
import PropTypes from 'prop-types';
import RRule from 'rrule';
import moment from 'moment';

import RecurrenceDialogComponent from '../components/recurrence-dialog';
import { validationErrorSkeleton } from '../../store/skeletons';
import CrudContainer from '../../common/crud-container';

class RecurrenceDialog extends CrudContainer {
  constructor(props) {
    super(props);
    this.state = {
      rrule: null,
      ends: 'never',
      until: moment().add(1, 'years').toDate(),
      count: 10,
      errors: {},
    };

    this.handleByWeekdayChange = this.handleByWeekdayChange.bind(this);
    this.handleEndsChange = this.handleEndsChange.bind(this);
    this.handleUntilChange = this.handleUntilChange.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.addError = this.addError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rrule) {
      document.addEventListener('keydown', this.handleEscape);

      let { rrule } = nextProps;
      if (rrule && rrule.options.freq === null) {
        rrule = new RRule(Object.assign(
          {},
          rrule.options,
          { freq: 2 },
        ));
      }
      let ends = 'never';
      if (rrule.options.until) {
        ends = 'on';
      } else if (rrule.options.count) {
        ends = 'after';
      }
      this.setState({
        rrule,
        ends,
        until: rrule.options.until || moment().add(1, 'years').toDate(),
        count: rrule.options.count || 10,
      });
      return;
    }
    this.setState({
      rrule: null,
      ends: 'never',
      until: moment().add(1, 'years').toDate(),
      count: 10,
    });
    document.removeEventListener('keydown', this.handleEscape);
  }

  handleByWeekdayChange(event) {
    const byWeekday = this.state.rrule.options.byweekday.slice(0);
    const value = parseInt(event.target.value, 10);
    const index = byWeekday.indexOf(value);
    if (index !== -1 && byWeekday.length > 1) {
      byWeekday.splice(index, 1);
    } else {
      byWeekday.push(value);
    }
    this.handleChange({ target: { name: 'byweekday', value: byWeekday } });
  }

  handleEndsChange(ends) {
    this.setState({ ends });
    let options = {};
    switch (ends) {
      case 'never':
        options = { until: null, count: null };
        break;
      case 'on':
        options = { until: this.state.until, count: null };
        break;
      case 'after':
        options = { until: null, count: this.state.count };
        break;
      default:
        break;
    }
    const rrule = new RRule(Object.assign(
      {},
      this.state.rrule.options,
      options,
    ));
    this.setState({ rrule });
  }

  handleUntilChange(date) {
    this.setState({ until: date }, () => this.handleEndsChange('on'));
  }

  handleCountChange(event) {
    this.setState({ count: Number(event.target.value) }, () => this.handleEndsChange('after'));
  }

  handleChange(event) {
    const options = Object.assign(
      {},
      this.state.rrule.options,
      { [event.target.name]: event.target.value },
    );
    if (options.freq !== 2) {
      options.byweekday = null;
    }
    options.bymonth = null;
    options.bymonthday = null;
    const rrule = new RRule(options);
    this.setState({ rrule });
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.handleSave();
    }
  }

  handleEscape(event) {
    if (event.keyCode === 27) {
      this.props.onDiscard();
    }
  }

  handleSave() {
    const errors = [];
    if (this.state.rrule.options.interval < 1) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'Must be greater than zero.', source: { pointer: 'data.attributes.rrule.options.interval' } },
      ));
    }

    if (errors.length) {
      this.setErrors(errors);
      return;
    }

    this.setState({ errors: {} });

    this.props.onSave(this.state.rrule);
  }

  setErrors(errors) {
    const errorsDict = {};
    for (let i = 0; i < errors.length; i += 1) {
      Object.assign(errorsDict, { [errors[i].source.pointer]: errors[i] });
    }
    this.setState({ errors: errorsDict });
  }

  render() {
    return (
      <RecurrenceDialogComponent
        {...this.state}
        onByWeekdayChange={this.handleByWeekdayChange}
        onEndsChange={this.handleEndsChange}
        onUntilChange={this.handleUntilChange}
        onCountChange={this.handleCountChange}
        onChange={this.handleChange}
        onSave={this.handleSave}
        onDiscard={this.props.onDiscard}
      />
    );
  }
}

RecurrenceDialog.defaultProps = {
  rrule: null,
};

RecurrenceDialog.propTypes = {
  rrule: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
};

export default RecurrenceDialog;
