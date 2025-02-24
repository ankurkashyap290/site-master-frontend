import moment from 'moment';
import { keyedObjectAdapter, unkeyedObjectAdapter } from 'store/adapters';
import dateformats from '../../config/dateformats';
import { TRANSPORTATION_TYPE_EXTERNAL } from '../../config/transportation_type';

export const driverToEditableAdapter = (driver) => {
  const editableDriver = keyedObjectAdapter(driver);
  if (!editableDriver.pickup_time_moment) {
    editableDriver.pickup_time_moment = moment(
      driver.pickup_time,
      dateformats.dbTimeFormat,
    );
  }
  return editableDriver;
};

export const driverFromEditableAdapter = (driver) => {
  const editableDriver = unkeyedObjectAdapter(driver);
  if (editableDriver.pickup_time_moment) {
    // eslint-disable-next-line
    editableDriver.pickup_time = editableDriver.pickup_time_moment._isValid ? editableDriver.pickup_time_moment.format(dateformats.dbTimeFormat) : null;
  }
  delete (editableDriver.pickup_time_moment);
  return editableDriver;
};

export const eventToEditableAdapter = (event) => {
  const attributes = Object.assign({}, event.attributes);

  attributes.drivers =
    attributes.drivers.map(driver => driverToEditableAdapter(driver));

  return Object.assign({}, event, { attributes });
};

export const eventFromEditableAdapter = (editableEvent) => {
  const event = Object.assign(
    {},
    editableEvent,
    {
      attributes: Object.assign(
        {},
        editableEvent.attributes,
        {
          transportation_type: editableEvent.attributes.transportation_type === `${TRANSPORTATION_TYPE_EXTERNAL}-custom` ?
            TRANSPORTATION_TYPE_EXTERNAL :
            editableEvent.attributes.transportation_type,
          drivers: editableEvent.attributes.drivers
            .map(driver => driverFromEditableAdapter(driver)),
        },
      ),
    },
  );
  event.attributes.drivers =
    event.attributes.drivers.map(driver => unkeyedObjectAdapter(driver));

  return event;
};
