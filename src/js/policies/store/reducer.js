import {
  SET_MODEL_LIST,
  UPDATE_MODEL,
  SET_EDITABLE_MODEL,
} from './action-types';
import { policySkeleton } from '../../store/skeletons';

const policyReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_MODEL_LIST: {
      return Object.assign({}, state, { modelList: action.modelList });
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
    case SET_EDITABLE_MODEL: {
      if (action.editableModel === null) {
        return Object.assign({}, state, { editableModel: null });
      }
      return Object.assign(
        {},
        state,
        { editableModel: Object.assign({}, policySkeleton, action.editableModel) },
      );
    }
    default:
      return state;
  }
};

export default policyReducer;
