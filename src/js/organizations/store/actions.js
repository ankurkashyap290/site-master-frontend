import axios from 'axios';
import {
  SET_MODEL_LIST,
  ADD_NEW_MODEL,
  UPDATE_MODEL,
  REMOVE_MODEL_FROM_LIST,
  SET_EDITABLE_MODEL,
  SET_DELETABLE_MODEL,
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

// Getters

export const getOrganizationList = (page, orderBy, order) =>
  dispatch =>
    axios.get('organizations', {
      params: {
        page: page + 1,
        ...(orderBy && order ? { order_by: orderBy, order } : {}),
      },
    })
      .then((response) => {
        dispatch(setModelList(response.data));
      });

// Manipulators

export const saveModel = model => (dispatch) => {
  if (model.id) {
    return axios.put(`organizations/${model.id}`, {
      data: {
        type: 'organizations',
        attributes: model.attributes,
      },
    })
      .then((response) => {
        dispatch(updateModel(response.data.data));
        dispatch(setEditableModel(null));
      });
  }
  return axios.post('organizations', {
    data: {
      type: 'organizations',
      attributes: model.attributes,
    },
  })
    .then((response) => {
      dispatch(addNewModel(response.data.data));
      dispatch(setEditableModel(null));
    });
};

export const deleteModel = id => dispatch =>
  axios.delete(`organizations/${id}`)
    .then(() => {
      dispatch(removeModelFromList(id));
      dispatch(setDeletableModel(null));
    });
