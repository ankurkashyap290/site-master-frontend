import axios from 'axios';

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
import { eventToEditableAdapter, calendarViewRangeAdapter } from './adapters';

// Setters

export const setModelList = modelList => ({
  type: SET_MODEL_LIST,
  modelList,
});

export const setCalendarConfig = calendarConfig => ({
  type: SET_CALENDAR_CONFIG,
  calendarConfig,
});

export const setSearchKey = searchKey => ({
  type: SET_SEARCH_KEY,
  searchKey,
});

export const addNewModel = model => ({
  type: ADD_NEW_MODEL,
  model,
});

export const updateModel = model => ({
  type: UPDATE_MODEL,
  model,
});

export const removeModelFromList = id => ({
  type: REMOVE_MODEL_FROM_LIST,
  id,
});

export const setEditableModel = editableModel => ({
  type: SET_EDITABLE_MODEL,
  editableModel: editableModel ? eventToEditableAdapter(editableModel) : null,
});

export const setEditableModelAttribute = (key, value) => ({
  type: SET_EDITABLE_MODEL_ATTRIBUTE,
  key,
  value,
});

export const setDeletableModel = deletableModel => ({
  type: SET_DELETABLE_MODEL,
  deletableModel,
});

// Getters

export const getModelFromList = id => ({
  type: GET_MODEL_FROM_LIST,
  id,
});

/**
 * Get events by optional pagination
 *
 * All filters are optional, but fromDate and toDate is pair use it together
 * filters = {
 *  fromDate, // YYYY-MM-DD
 *  toDate, // YYYY-MM-DD
 *  searchKey, // String
 * }
 *
 * @param {number} facilityId
 * @param {object} filters
 */
export const getEvents = (facilityId, filters) => dispatch =>
  axios.get('events', {
    params: {
      facility_id: facilityId,
      ...(filters),
    },
  })
    .then(response =>
      dispatch(setModelList(response.data.data)));

export const changeCalendarConfig = calendarConfig => (dispatch, getState) => {
  const facilityId = getState().facilityReducer.selectedFacility.id;
  const view = calendarConfig.view || getState().calendarReducer.calendarConfig.view;
  const date = calendarConfig.date || getState().calendarReducer.calendarConfig.date;
  const { formatedStartDate, formatedEndDate } =
    calendarViewRangeAdapter(date, view);

  return dispatch(getEvents(
    facilityId,
    {
      fromDate: formatedStartDate,
      toDate: formatedEndDate,
    },
  ))
    .then(() =>
      dispatch(setCalendarConfig(calendarConfig)));
};

// Manipulators

export const saveModel = model => (dispatch) => {
  const attributes = {
    name: model.attributes.name,
    passengers: model.attributes.passengers,
    date: model.attributes.date,
    start_time: model.attributes.start_time,
    end_time: model.attributes.end_time,
    rrule: model.attributes.rrule,
    transport_type: model.attributes.transport_type,
    description: model.attributes.description,
    location_id: model.attributes.location_id,
    facility_id: model.attributes.facility_id,
  };

  if (model.id) {
    return axios.put(`events/${model.id}`, {
      data: {
        type: 'events',
        attributes,
      },
    })
      .then((response) => {
        dispatch(updateModel(response.data.data));
        dispatch(setEditableModel(null));
      });
  }

  return axios.post('events', {
    data: {
      type: 'events',
      attributes,
    },
  })
    .then((response) => {
      dispatch(addNewModel(response.data.data));
      dispatch(setEditableModel(null));
    });
};

export const deleteModel = id => dispatch =>
  axios.delete(`events/${id}`)
    .then(() => {
      dispatch(removeModelFromList(id));
      dispatch(setDeletableModel(null));
    });
