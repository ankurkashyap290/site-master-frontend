import { cloneDeep } from 'lodash';
import moment from 'moment';

import {
  SET_MODEL_LIST,
  SET_PENDING_MODEL_LIST,
  UPDATE_MODEL,
  SET_EDITABLE_MODEL,
  SET_INTERNAL_DRIVERS,
  SET_EXTERNAL_DRIVERS,
} from './action-types';

import { TRANSPORTATION_TYPE_INTERNAL, TRANSPORTATION_TYPE_EXTERNAL } from '../../config/transportation_type';

import { driverSkeleton } from '../../store/skeletons';
import dateformats from '../../config/dateformats';

const biddingReducer = (state = {}, action) => {
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
    case SET_PENDING_MODEL_LIST: {
      return Object.assign(
        {},
        state,
        {
          pendingModelList: action.pendingModelList,
        },
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
    case SET_EDITABLE_MODEL: {
      const editableModel = cloneDeep(action.editableModel);
      if (editableModel && (
        !state.editableModel ||
        state.editableModel.attributes.transportation_type
          !== editableModel.attributes.transportation_type
      )) {
        const driversOnEvent = state.modelList
          .filter(e => e.id === action.editableModel.id)[0].attributes.drivers;
        editableModel.attributes.drivers = [];
        if ([TRANSPORTATION_TYPE_INTERNAL, `${TRANSPORTATION_TYPE_EXTERNAL}-custom`].indexOf(editableModel.attributes.transportation_type) > -1) {
          editableModel.attributes.drivers
            .push(Object.assign(
              {}, driverSkeleton,
              {
                pickup_time_moment:
                moment(editableModel.attributes.start_time, dateformats.dbTimeFormat),
              },
            ));
        } else if (driversOnEvent.length) {
          editableModel.attributes.drivers = driversOnEvent;
        } else {
          state.externalDrivers.map(etc =>
            editableModel.attributes.drivers
              .push(Object.assign({}, driverSkeleton, { etc_id: etc.id })));
        }
      }
      return Object.assign({}, state, { editableModel });
    }
    case SET_INTERNAL_DRIVERS: {
      return Object.assign({}, state, { internalDrivers: action.users });
    }
    case SET_EXTERNAL_DRIVERS: {
      return Object.assign({}, state, { externalDrivers: action.etcs });
    }
    default:
      return state;
  }
};

export default biddingReducer;
