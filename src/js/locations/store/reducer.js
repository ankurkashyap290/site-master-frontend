import {
  SET_MODEL_LIST,
  ADD_NEW_MODEL,
  UPDATE_MODEL,
  REMOVE_MODEL_FROM_LIST,
  SET_EDITABLE_MODEL,
  SET_DELETABLE_MODEL,
  SET_SEARCH_KEY,
  SET_WARNING_MESSAGE,
} from './action-types';

import { modelSkeleton } from '../../store/skeletons';

const locationReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_MODEL_LIST: {
      return Object.assign(
        {},
        state,
        {
          modelList: action.modelList.data,
          modelListPagination: (action.modelList.meta ? action.modelList.meta.pagination : {}),
        },
      );
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
        { editableModel: Object.assign({}, modelSkeleton, action.editableModel) },
      );
    }
    case SET_DELETABLE_MODEL: {
      return Object.assign({}, state, { deletableModel: action.deletableModel });
    }
    case SET_SEARCH_KEY: {
      return Object.assign({}, state, { searchKey: action.searchKey });
    }
    case SET_WARNING_MESSAGE: {
      return Object.assign({}, state, { warningMessage: action.warningMessage });
    }
    default:
      return state;
  }
};

export default locationReducer;
