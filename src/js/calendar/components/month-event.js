import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import dateformats from 'config/dateformats';

class MonthEventComponent extends React.Component {
  render() {
    const { event } = this.props;
    const startTime = moment(event.start).format(dateformats.timeFormat);
    const endTime = moment(event.end).format(dateformats.timeFormat);
    return (
      <div>
        <div className="rbc-event-label">{`${startTime} - ${endTime}`}</div>
        <div>{event.name}</div>
        <div className="rbc-event-label">{event.passengers.map(passenger => passenger.name).join(', ')}</div>
      </div>
    );
  }
}

MonthEventComponent.propTypes = {
  event: PropTypes.object.isRequired,
};

export default MonthEventComponent;
