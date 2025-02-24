import {
  SET_LOADING,
  SET_FACILITY_MODEL_LIST,
  SET_ETC_MODEL_LIST,
  SET_FACILITY_DRILLDOWN,
  SET_ETC_DRILLDOWN,
  SET_FACILITY_DAILY_EVENTS,
  SET_ETC_DAILY_EVENTS,
  SET_SELECTED_FACILITIES,
  SET_SELECTED_ETCS,
} from './action-types';

const reportingReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case SET_FACILITY_MODEL_LIST: {
      return Object.assign({}, state, { facilityModelList: action.facilityModelList });
    }
    case SET_ETC_MODEL_LIST: {
      return Object.assign({}, state, { etcModelList: action.etcModelList });
    }
    case SET_SELECTED_FACILITIES: {
      return Object.assign({}, state, { selectedFacilities: action.facilityIds });
    }
    case SET_SELECTED_ETCS: {
      return Object.assign({}, state, { selectedETCs: action.etcIds });
    }
    case SET_FACILITY_DRILLDOWN: {
      return Object.assign({}, state, { facilityDetails: action.facilityDetails });
    }
    case SET_ETC_DRILLDOWN: {
      return Object.assign({}, state, { etcDetails: action.etcDetails });
    }
    case SET_FACILITY_DAILY_EVENTS: {
      return Object.assign({}, state, { facilityDailyEvents: action.events });
    }
    case SET_ETC_DAILY_EVENTS: {
      return Object.assign({}, state, { etcDailyEvents: action.events });
    }
    default:
      return state;
  }
};

export default reportingReducer;
