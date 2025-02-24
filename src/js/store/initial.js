import authInitialState from '../auth/store/initial-state';
import calendarInitialState from '../calendar/store/initial-state';
import organizationInitialState from '../organizations/store/initial-state';
import facilityInitialState from '../facilities/store/initial-state';
import userInitialState from '../users/store/initial-state';
import policyInitialState from '../policies/store/initial-state';
import clientInitialState from '../clients/store/initial-state';
import locationInitialState from '../locations/store/initial-state';
import transportLogInitialState from '../transport-logs/store/initial-state';
import transportBillingLogInitialState from '../transport-billing-logs/store/initial-state';
import etcInitialState from '../etcs/store/initial-state';
import biddingInitialState from '../bidding/store/initial-state';
import reportingInitialState from '../reporting/store/initial-state';

const initial = {
  authReducer: authInitialState,
  calendarReducer: calendarInitialState,
  facilityReducer: facilityInitialState,
  organizationReducer: organizationInitialState,
  locationReducer: locationInitialState,
  userReducer: userInitialState,
  policyReducer: policyInitialState,
  clientReducer: clientInitialState,
  transportLogReducer: transportLogInitialState,
  transportBillingLogReducer: transportBillingLogInitialState,
  etcReducer: etcInitialState,
  biddingReducer: biddingInitialState,
  reportingReducer: reportingInitialState,
};

export default initial;
