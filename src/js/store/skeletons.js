import equipment from '../config/equipment';
import transportType from '../config/transport_type';
import colors from '../config/colors';

export const validationErrorSkeleton = {
  status: '400',
  detail: 'Validation error.',
  source: {
    pointer: 'data.attributes',
  },
};

export const userSkeleton = {
  attributes: {
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    phone: '',
    role_id: null,
    color_id: null,
    organization: {
      id: null,
      name: '',
    },
    facility: {
      id: null,
      name: '',
    },
  },
  id: null,
  links: {},
  type: 'users',
};

export const locationSkeleton = {
  attributes: {
    name: '',
    phone: '',
    city: '',
    address: '',
    state: '',
    postcode: '',
    one_time: false,
  },
  id: null,
  links: {},
  type: 'locations',
};

export const clientSkeleton = {
  attributes: {
    first_name: '',
    middle_name: '',
    last_name: '',
    room_number: '',
    responsible_party_email: '',
    facility_id: null,
    transport_status: null,
    ongoing_event: null,
  },
  id: null,
  links: {},
  type: 'users',
};

export const appointmentSkeleton = {
  id: null,
  time: null,
  location: Object.assign({}, locationSkeleton.attributes, { id: null }),
};

export const passengerSkeleton = {
  id: null,
  name: '',
  room_number: '',
  appointments: [
    Object.assign({}, appointmentSkeleton),
  ],
};

export const driverSkeleton = {
  id: null,
  etc_id: null,
  user_id: null,
  status: null,
  name: '',
  emails: '',
  pickup_time: null,
  pickup_time_moment: null,
  fee: '',
};

export const eventSkeleton = {
  attributes: {
    name: '',
    date: null,
    start_time: null,
    end_time: null,
    rrule: null,
    transport_type: '',
    transportation_type: 'external',
    description: '',
    user_id: null,
    facility_id: null,
    location_id: null,
    passengers: [
      Object.assign({}, passengerSkeleton),
    ],
    drivers: [],
  },
  id: null,
  links: {},
  type: 'events',
};

export const organizationSkeleton = {
  attributes: {
    name: '',
    budget: '',
  },
  id: null,
  links: {},
  type: 'organizations',
};

export const facilitySkeleton = {
  attributes: {
    name: '',
    budget: '',
    timezone: '',
    organization_id: null,
  },
  id: null,
  links: {},
  type: 'facilities',
};

export const transportLogSkeleton = {
  attributes: {
    location_name: '',
    client_name: '',
    equipment: Object.keys(equipment)[0],
    equipment_secured: 0,
    signature: '',
    date: null,
  },
  id: null,
  links: {},
  type: 'transport-logs',
};


export const transportBillingLogSkeleton = {
  attributes: {
    location_name: '',
    client_name: '',
    transport_type: Object.keys(transportType)[0],
    destination_type: '',
    equipment: Object.keys(equipment)[0],
    mileage_to_start: '',
    mileage_to_end: '',
    mileage_return_start: '',
    mileage_return_end: '',
    fee: '',
    date: null,
  },
  id: null,
  links: {},
  type: 'transport-billing-logs',
};

export const etcSkeleton = {
  attributes: {
    name: '',
    color_id: Object.entries(colors).filter(color => color[1].type === 'external')[0][0],
    emails: '',
    phone: '',
    location_id: null,
    facility_id: null,
  },
  id: null,
  links: {},
  type: 'etcs',
};
