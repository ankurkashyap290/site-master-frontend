import {
  SET_MODEL_LIST,
  ADD_NEW_MODEL,
  UPDATE_MODEL,
  REMOVE_MODEL_FROM_LIST,
  SET_EDITABLE_MODEL,
  SET_DELETABLE_MODEL,
  SET_SELECTED_FACILITY,
} from './action-types';

import { facilitySkeleton } from '../../store/skeletons';

const facilityReducer = (state = {}, action) => {
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
      const updatedListState = state.modelList.map((item) => {
        if (item.id === action.model.id) {
          return action.model;
        }
        return item;
      });
      return Object.assign({}, state, { modelList: updatedListState });
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
        { editableModel: Object.assign({}, facilitySkeleton, action.editableModel) },
      );
    }
    case SET_DELETABLE_MODEL: {
      return Object.assign({}, state, { deletableModel: action.deletableModel });
    }
    case SET_SELECTED_FACILITY: {
      return Object.assign(
        {},
        state,
        { selectedFacility: action.facility },
      );
    }
    default:
      return state;
  }
};

export default facilityReducer;
