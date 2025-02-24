const policies = {
  Organizations: {
    'Super Admin': ['*'],
  },
  'Organization Admins': {
    'Super Admin': ['*'],
  },
  Facilities: {
    'Organization Admin': ['*'],
    'Upper Management': ['*'],
  },
  'Upper Management': {
    'Organization Admin': ['*'],
    'Upper Management': ['view'],
  },
  Calendar: {
    'Organization Admin': ['*'],
    'Upper Management': ['*'],
    'Facility Admin': ['*'],
    'Master User': ['custom:Event'],
    Administrator: ['custom:Event'],
  },
  Bidding: {
    'Organization Admin': ['*'],
    'Facility Admin': ['*'],
    'Master User': ['custom:Event'],
  },
  Users: {
    'Organization Admin': ['*'],
    'Upper Management': ['*'],
    'Facility Admin': ['*'],
  },
  Policies: {
    'Organization Admin': ['*'],
    'Facility Admin': ['*'],
  },
  Clients: {
    'Organization Admin': ['*'],
    'Upper Management': ['*'],
    'Facility Admin': ['*'],
    'Master User': ['custom:Client'],
    Administrator: ['custom:Client'],
  },
  Locations: {
    'Organization Admin': ['*'],
    'Upper Management': ['*'],
    'Facility Admin': ['*'],
    'Master User': ['*'],
  },
  'External Transportation Companies': {
    'Organization Admin': ['*'],
    'Upper Management': ['*'],
    'Facility Admin': ['*'],
    'Master User': ['custom:ExternalTransportationCompany'],
  },
  'Transport Logs': {
    'Organization Admin': ['*'],
    'Facility Admin': ['*'],
    'Master User': ['custom:TransportLog'],
    Administrator: ['custom:TransportLog'],
  },
  'Transport Billing Logs': {
    'Organization Admin': ['*'],
    'Facility Admin': ['*'],
    'Master User': ['custom:TransportBillingLog'],
    Administrator: ['custom:TransportBillingLog'],
  },
  Reporting: {
    'Organization Admin': ['view'],
    'Upper Management': ['view'],
    'Facility Admin': ['view'],
    'Master User': ['view'],
  },
};

export default policies;
