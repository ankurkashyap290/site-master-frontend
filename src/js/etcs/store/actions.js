import axios from 'axios';
import {
  SET_MODEL_LIST,
  ADD_NEW_MODEL,
  UPDATE_MODEL,
  REMOVE_MODEL_FROM_LIST,
  SET_EDITABLE_MODEL,
  SET_DELETABLE_MODEL,
  SET_FACILITY,
  SET_DETAILS,
  SET_ETC_DRIVER,
  SET_WARNING_MESSAGE,
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

export const setFacility = facilityId => ({
  type: SET_FACILITY,
  facilityId,
});

export const showDetails = data => ({
  type: SET_DETAILS,
  data,
});

export const setWarningMessage = warningMessage => ({
  type: SET_WARNING_MESSAGE,
  warningMessage,
});

// Getters

export const getETCList = (page, orderBy, order) => (dispatch, getState) =>
  axios.get('etcs', {
    params: {
      facility_id: getState().facilityReducer.selectedFacility.id,
      ...((page || page === 0) ? { page: page + 1 } : {}),
      ...(orderBy && order ? { order_by: orderBy, order } : {}),
    },
  })
    .then(response =>
      dispatch(setModelList(response.data)));

// Manipulators

export const saveModel = model => (dispatch, getState) => {
  const attributes = {
    name: model.attributes.name,
    color_id: model.attributes.color_id !== 0 ? model.attributes.color_id : null,
    emails: model.attributes.emails,
    phone: model.attributes.phone,
    facility_id: getState().facilityReducer.selectedFacility.id,
  };
  if (model.attributes.location_id) {
    attributes.location_id = model.attributes.location_id;
  }
  if (model.id) {
    return axios.put(`etcs/${model.id}`, {
      data: {
        type: 'etcs',
        attributes,
      },
    })
      .then((response) => {
        dispatch(updateModel(response.data.data));
        dispatch(setEditableModel(null));
      });
  }
  return axios.post('etcs', {
    data: {
      type: 'etcs',
      attributes,
    },
  })
    .then((response) => {
      dispatch(addNewModel(response.data.data));
      dispatch(setEditableModel(null));
    });
};

export const deleteModel = id => dispatch =>
  axios.delete(`etcs/${id}`)
    .then(() => {
      dispatch(removeModelFromList(id));
      dispatch(setDeletableModel(null));
    }).catch((error) => {
      if (error.response) {
        dispatch(setWarningMessage(error.response.data.errors[0].detail));
        dispatch(setDeletableModel(null));
      }
    });

export const getEtcBid = hash => dispatch =>
  axios.get(`etc-bid/${hash}`)
    .then((response) => {
      dispatch({
        type: SET_ETC_DRIVER,
        driver: response.data.data,
      });
    });

export const saveBid = model => (dispatch, getState) =>
  axios.put(`etc-bid/${getState().etcReducer.driver.id}`, {
    data: {
      type: 'bids',
      attributes: model,
    },
  })
    .then((response) => {
      dispatch({
        type: SET_ETC_DRIVER,
        driver: response.data.data,
      });
    });
