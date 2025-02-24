import { cloneDeep } from 'lodash';
import {
  SET_MODEL_LIST,
  SET_CALENDAR_CONFIG,
  SET_SEARCH_KEY,
  ADD_NEW_MODEL,
  UPDATE_MODEL,
  REMOVE_MODEL_FROM_LIST,
  SET_EDITABLE_MODEL,
  SET_EDITABLE_MODEL_ATTRIBUTE,
  SET_DELETABLE_MODEL,
  GET_MODEL_FROM_LIST,
} from './action-types';

import { eventSkeleton } from '../../store/skeletons';

const calendarReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_MODEL_LIST: {
      return Object.assign({}, state, { modelList: action.modelList });
    }
    case SET_CALENDAR_CONFIG: {
      const calendarConfig = Object.assign(
        {},
        state.calendarConfig,
        action.calendarConfig,
      );

      return Object.assign({}, state, { calendarConfig });
    }
    case SET_SEARCH_KEY: {
      return Object.assign({}, state, { searchKey: action.searchKey });
    }
    case ADD_NEW_MODEL: {
      return Object.assign(
        {},
        state,
        { modelList: [...state.modelList, action.model] },
      );
    }
    case UPDATE_MODEL: {
      const updatedModelList = state.modelList.map((item) => {
        if (item.id === action.model.id) {
          return action.model;
        }
        return item;
      });
      return Object.assign({}, state, {
        modelList: updatedModelList,
        modelDetails: action.model,
      });
    }
    case REMOVE_MODEL_FROM_LIST: {
      const updatedList = state.modelList.filter(item => item.id !== action.id);
      return Object.assign({}, state, {
        modelList: updatedList,
        modelDetails: null,
      });
    }
    case SET_EDITABLE_MODEL: {
      if (action.editableModel === null) {
        return Object.assign({}, state, { editableModel: null });
      }
      return Object.assign(
        {},
        state,
        { editableModel: Object.assign({}, eventSkeleton, action.editableModel) },
      );
    }
    case SET_EDITABLE_MODEL_ATTRIBUTE: {
      const attributes = cloneDeep(state.editableModel.attributes);
      attributes[action.key] = action.value;
      return Object.assign(
        {},
        state,
        { editableModel: Object.assign({}, state.editableModel, { attributes }) },
      );
    }
    case SET_DELETABLE_MODEL: {
      return Object.assign({}, state, { deletableModel: action.deletableModel });
    }
    case GET_MODEL_FROM_LIST: {
      if (action.id === null) {
        return Object.assign({}, state, { modelDetails: null });
      }
      const selectedModel = state.modelList.filter(item => item.id === action.id)[0];
      return Object.assign(
        {},
        state,
        { modelDetails: Object.assign({}, eventSkeleton, selectedModel) },
      );
    }
    default:
      return state;
  }
};

export default calendarReducer;
