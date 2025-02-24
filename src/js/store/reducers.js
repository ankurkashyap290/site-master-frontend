import { combineReducers } from 'redux';

import authReducer from '../auth/store/reducer';
import calendarReducer from '../calendar/store/reducer';
import organizationReducer from '../organizations/store/reducer';
import facilityReducer from '../facilities/store/reducer';
import clientReducer from '../clients/store/reducer';
import userReducer from '../users/store/reducer';
import policyReducer from '../policies/store/reducer';
import locationReducer from '../locations/store/reducer';
import transportLogReducer from '../transport-logs/store/reducer';
import transportBillingLogReducer from '../transport-billing-logs/store/reducer';
import etcReducer from '../etcs/store/reducer';
import biddingReducer from '../bidding/store/reducer';
import reportingReducer from '../reporting/store/reducer';

const reducers = combineReducers({
  authReducer,
  calendarReducer,
  facilityReducer,
  organizationReducer,
  locationReducer,
  clientReducer,
  userReducer,
  policyReducer,
  transportLogReducer,
  transportBillingLogReducer,
  etcReducer,
  biddingReducer,
  reportingReducer,
});

export default reducers;
