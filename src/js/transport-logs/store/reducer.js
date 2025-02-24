import moment from 'moment';
import dateformats from 'config/dateformats';
import { transportLogSkeleton } from 'store/skeletons';
import {
  SET_MODEL_LIST,
  ADD_NEW_MODEL,
  UPDATE_MODEL,
  REMOVE_MODEL_FROM_LIST,
  SET_EDITABLE_MODEL,
  SET_DELETABLE_MODEL,
  SET_PAGER,
  SET_FILTER,
  SET_DETAILS,
} from './action-types';

const locationReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_MODEL_LIST: {
      return Object.assign({}, state, { modelList: action.modelList });
    }
    case ADD_NEW_MODEL: {
      return Object.assign(
        {},
        state,
        { modelList: [...state.modelList, action.model] },
      );
    }
    case UPDATE_MODEL: {
      const updatedLocationList = state.modelList.map((item) => {
        if (item.id === action.model.id) {
          return action.model;
        }
        return item;
      });
      return Object.assign({}, state, { modelList: updatedLocationList });
    }
    case REMOVE_MODEL_FROM_LIST: {
      const updatedList = state.modelList.filter(item => item.id !== action.id);
      return Object.assign({}, state, { modelList: updatedList });
    }
    case SET_EDITABLE_MODEL: {
      if (action.editableModel === null) {
        return Object.assign({}, state, { editableModel: null });
      }
      return Object.assign(
        {},
        state,
        { editableModel: Object.assign({}, transportLogSkeleton, action.editableModel) },
      );
    }
    case SET_DELETABLE_MODEL: {
      return Object.assign({}, state, { deletableModel: action.deletableModel });
    }
    case SET_PAGER: {
      return Object.assign(
        {},
        state,
        { pagination: action.data.meta.pagination, links: action.data.links },
      );
    }
    case SET_FILTER: {
      let from = '';
      let to = '';
      if (action.filter === 'today') {
        from = moment().startOf('day').format(dateformats.dbDateTimeFormat);
        to = moment().endOf('day').format(dateformats.dbDateTimeFormat);
      }
      if (action.filter === 'thismonth') {
        from = moment().startOf('month').format(dateformats.dbDateTimeFormat);
        to = moment().endOf('day').format(dateformats.dbDateTimeFormat);
      }
      if (action.filter === 'lastmonth') {
        from = moment().subtract(1, 'month').startOf('month').format(dateformats.dbDateTimeFormat);
        to = moment().subtract(1, 'month').endOf('month').format(dateformats.dbDateTimeFormat);
      }
      return Object.assign({}, state, { filter: action.filter, from, to });
    }
    case SET_DETAILS: {
      return Object.assign({}, state, { modelDetails: action.data });
    }
    default:
      return state;
  }
};

export default locationReducer;
