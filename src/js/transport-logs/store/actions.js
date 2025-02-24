import axios from 'axios';

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

// Setters

export const setModelList = modelList => ({
  type: SET_MODEL_LIST,
  modelList,
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
  editableModel,
});

export const setDeletableModel = deletableModel => ({
  type: SET_DELETABLE_MODEL,
  deletableModel,
});

export const setPager = data => ({
  type: SET_PAGER,
  data,
});

export const setFilterType = filter => ({
  type: SET_FILTER,
  filter,
});

export const showDetails = data => ({
  type: SET_DETAILS,
  data,
});

// Getters

export const getTransportLog = page => (dispatch, getState) =>
  axios.get('transport-logs', {
    params: {
      page,
      from: getState().transportLogReducer.from,
      to: getState().transportLogReducer.to,
      facilityId: getState().facilityReducer.selectedFacility.id,
    },
  })
    .then((response) => {
      dispatch(setModelList(response.data.data));
      dispatch(setPager(response.data));
    });

// Manipulators

export const saveModel = model => (dispatch) => {
  if (model.id) {
    return axios.put(`transport-logs/${model.id}`, {
      data: {
        type: 'transport-logs',
        attributes: model.attributes,
      },
    })
      .then((response) => {
        dispatch(updateModel(response.data.data));
        dispatch(setEditableModel(null));
      });
  }
  return axios.post('transport-logs', {
    data: {
      type: 'transport-logs',
      attributes: model.attributes,
    },
  })
    .then(() => {
      dispatch(getTransportLog(1));
      dispatch(setEditableModel(null));
    });
};

export const deleteModel = id => dispatch =>
  axios.delete(`transport-logs/${id}`)
    .then(() => {
      dispatch(removeModelFromList(id));
      dispatch(setDeletableModel(null));
    });
