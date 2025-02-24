import moment from 'moment';
import { RRule } from 'rrule';

import dateformats from 'config/dateformats';
import { keyedObjectAdapter, unkeyedObjectAdapter } from 'store/adapters';
import colors from '../../config/colors';

export const eventBgColor = (acceptedDriver) => {
  let bgColor = '757575'; // Doesn't have accepted driver
  if (acceptedDriver) {
    bgColor = acceptedDriver.details && acceptedDriver.details.color_id ? colors[acceptedDriver.details.color_id].value : '424242';
  }
  return bgColor;
};

export const eventDriverName = (acceptedDriver) => {
  let driverName = '-';
  if (acceptedDriver) {
    driverName = acceptedDriver.details && acceptedDriver.details.name ?
      acceptedDriver.details.name : acceptedDriver.name;
  }
  return driverName;
};

export const eventAdapter = (event) => {
  const eventRecurrences = [];
  for (let i = 0; i < event.attributes.recurrences.length; i += 1) {
    const recurrence = event.attributes.recurrences[i];
    eventRecurrences.push({
      id: event.id,
      title: `${event.attributes.name}\n${event.attributes.passengers.map(passenger => passenger.name).join(', ')}`,
      bgColor: eventBgColor(event.attributes.accepted_driver),
      name: event.attributes.name,
      passengers: event.attributes.passengers,
      start: moment(`${recurrence.date} ${recurrence.start_time}`).toDate(),
      end: moment(`${recurrence.date} ${recurrence.end_time}`).toDate(),
    });
  }
  return eventRecurrences;
};

export const eventRecurrencesSorterAdapter = (eventReccurencesList, orderBy, order) => {
  const sortedEventRecurrencesList = eventReccurencesList.slice(0);
  const comparators = {
    byDate: (aDateTime, bDateTime) =>
      (moment(aDateTime).diff(moment(bDateTime))) *
         (order === 'asc' ? 1 : -1),
    byName: (a, b) => {
      const aName = a.toLowerCase();
      const bName = b.toLowerCase();
      let diff = 0;

      if (aName < bName) {
        diff = -1;
      } else if (aName > bName) {
        diff = 1;
      }
      return diff * (order === 'asc' ? 1 : -1);
    },
  };

  switch (orderBy) {
    case 'date':
      sortedEventRecurrencesList
        .sort((a, b) => comparators.byDate(a.start, b.start));
      break;
    case 'name':
      sortedEventRecurrencesList
        .sort((a, b) => comparators.byName(a.title, b.title));
      break;
    case 'passenger':
      sortedEventRecurrencesList
        .sort((a, b) =>
          comparators.byName(
            a.passengers
              .sort((passengerA, passengerB) =>
                comparators.byName(passengerA.name, passengerB.name))[0].name,
            b.passengers
              .sort((passengerA, passengerB) =>
                comparators.byName(passengerA.name, passengerB.name))[0].name,
          ));
      break;
    default: //
  }
  return sortedEventRecurrencesList;
};

export const eventCollectionAdapter = (events) => {
  let eventRecurrences = [];

  for (let i = 0; i < events.length; i += 1) {
    eventRecurrences = [...eventRecurrences, ...eventAdapter(events[i])];
  }
  return eventRecurrences;
};

export const rruleFromStringAdapter = (rrule) => {
  let options = {
    wkst: RRule.SU,
  };
  if (rrule) {
    options = RRule.parseString(rrule);
  }
  options.wkst = RRule.SU;
  return new RRule(options);
};

export const rruleToStringAdapter = (rrule) => {
  let value = rrule;

  if (typeof value === 'object') {
    delete value.options.byhour;
    delete value.options.byminute;
    delete value.options.bysecond;
    delete value.options.dtstart;
    delete value.options.wkst;
    value = RRule.optionsToString(value.options);
  }
  return value;
};

export const appointmentToEditableAdapter = (appointment) => {
  const editableAppointment = keyedObjectAdapter(appointment);
  editableAppointment.time_moment = editableAppointment.time_moment || moment(
    appointment.time,
    dateformats.dbTimeFormat,
  );

  editableAppointment.time_moment = // eslint-disable-next-line no-underscore-dangle
    editableAppointment.time_moment._isValid ? editableAppointment.time_moment : null;

  if (!editableAppointment.location_id) {
    editableAppointment.location_id =
      editableAppointment.location ? editableAppointment.location.id : null;
  }
  return editableAppointment;
};

export const appointmentFromEditableAdapter = (appointment) => {
  const editableAppointment = unkeyedObjectAdapter(appointment);
  editableAppointment.time = editableAppointment.time_moment ?
    editableAppointment.time_moment.format(dateformats.dbTimeFormat) : null;
  editableAppointment.location_id = Number(editableAppointment.location.id);
  return editableAppointment;
};

export const passengerToEditableAdapter = (passenger) => {
  const keyedPassenger = keyedObjectAdapter(passenger);
  keyedPassenger.appointments =
    keyedPassenger.appointments.map(appointment => appointmentToEditableAdapter(appointment));
  return keyedPassenger;
};

export const passengerFromEditableAdapter = (passenger) => {
  const unkeyedPassenger = unkeyedObjectAdapter(passenger);
  unkeyedPassenger.appointments =
    unkeyedPassenger.appointments.map(appointment => appointmentFromEditableAdapter(appointment));
  return unkeyedPassenger;
};

export const eventToEditableAdapter = (event) => {
  const attributes = Object.assign({}, event.attributes);
  attributes.date_moment = attributes.date_moment || moment(
    attributes.date,
    dateformats.dbDateFormat,
  );

  attributes.start_time_moment = attributes.start_time_moment || moment(
    attributes.start_time,
    dateformats.dbTimeFormat,
  );
  attributes.end_time_moment = attributes.end_time_moment || moment(
    attributes.end_time,
    dateformats.dbTimeFormat,
  );
  /* eslint-disable */
  attributes.start_time_moment = attributes.start_time_moment._isValid ? attributes.start_time_moment : null;
  attributes.end_time_moment = attributes.end_time_moment._isValid ? attributes.end_time_moment : null;
  /* eslint-enable */
  attributes.user_name = `${attributes.user.first_name} ${attributes.user.middle_name} ${attributes.user.last_name}`;
  if (!attributes.location_id) {
    attributes.location_id = attributes.location ? attributes.location.id : null;
  }
  attributes.passengers =
    attributes.passengers.map(passenger => passengerToEditableAdapter(passenger));

  return Object.assign({}, event, { attributes });
};

export const eventFromEditableAdapter = (editableEvent) => {
  const { attributes } = editableEvent;
  const event = Object.assign(
    {},
    editableEvent,
    {
      attributes: Object.assign(
        {},
        attributes,
        {
          /* eslint-disable no-underscore-dangle */
          date:
            attributes.date_moment && attributes.date_moment._isValid ?
              attributes.date_moment.format(dateformats.dbDateFormat) : null,
          start_time:
            attributes.start_time_moment && attributes.start_time_moment._isValid ?
              attributes.start_time_moment.format(dateformats.dbTimeFormat) : null,
          end_time:
            attributes.end_time_moment && attributes.end_time_moment._isValid ?
              attributes.end_time_moment.format(dateformats.dbTimeFormat) : null,
          /* eslint-enable */
          user_name: undefined,
          passengers: attributes.passengers
            .map(passenger => passengerFromEditableAdapter(passenger)),
        },
      ),
    },
  );
  event.attributes.passengers =
    event.attributes.passengers.map(passenger => unkeyedObjectAdapter(passenger));

  return event;
};

export const calendarViewRangeAdapter = (date, view) => {
  let startDate = moment(date).startOf(view);
  let endDate = moment(date).endOf(view);

  // Expand to displayed range
  if (view === 'month') {
    startDate = startDate.startOf('week');
    endDate = endDate.endOf('week');
  }

  const formatedStartDate = moment(startDate).format(dateformats.dbDateFormat);
  const formatedEndDate = moment(endDate).format(dateformats.dbDateFormat);

  return { formatedStartDate, formatedEndDate };
};
