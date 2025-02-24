import axios from 'axios';

import {
  SET_MODEL_LIST,
  ADD_NEW_MODEL,
  UPDATE_MODEL,
  REMOVE_MODEL_FROM_LIST,
  SET_EDITABLE_MODEL,
  SET_DELETABLE_MODEL,
  SET_SELECTED_FACILITY,
} from './action-types';
import { getUser } from '../../auth/store/actions';

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

export const setSelectedFacility = (facility) => {
  if (facility.id) {
    axios.defaults.headers.common['Journey-Scopes'] = `facility_id=${facility.id}`;
  } else {
    delete axios.defaults.headers.common['Journey-Scopes'];
  }
  return {
    type: SET_SELECTED_FACILITY,
    facility,
  };
};

// Getters

export const getFacilityList = (id, page, orderBy, order) =>
  dispatch =>
    axios.get('facilities', {
      params: {
        organization_id: id,
        page: page + 1,
        ...(orderBy && order ? { order_by: orderBy, order } : {}),
      },
    })
      .then(response =>
        dispatch(setModelList(response.data)));

export const getFacility = id => dispatch =>
  axios.get(`facilities/${id}`)
    .then((response) => {
      dispatch(setSelectedFacility(response.data.data));
    });

// Manipulators

export const saveModel = model => (dispatch) => {
  if (model.id) {
    const attributes = {
      name: model.attributes.name,
      location_id: model.attributes.location_id,
      timezone: model.attributes.timezone,
    };
    return axios.put(`facilities/${model.id}`, {
      data: {
        type: 'facilities',
        attributes,
      },
    })
      .then((response) => {
        dispatch(updateModel(response.data.data));
        dispatch(setEditableModel(null));
        dispatch(getUser());
      });
  }
  return axios.post('facilities', {
    data: {
      type: 'facilities',
      attributes: model.attributes,
    },
  })
    .then((response) => {
      dispatch(addNewModel(response.data.data));
      dispatch(setEditableModel(null));
      dispatch(getUser());
    });
};

export const deleteModel = id => dispatch =>
  axios.delete(`facilities/${id}`)
    .then(() => {
      dispatch(removeModelFromList(id));
      dispatch(setDeletableModel(null));
      dispatch(getUser());
    });
