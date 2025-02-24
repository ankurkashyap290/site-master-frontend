import axios from 'axios';

import roles from 'config/roles';
import {
  SET_MODEL_LIST,
  SET_PENDING_MODEL_LIST,
  SET_EDITABLE_MODEL,
  SET_INTERNAL_DRIVERS,
  SET_EXTERNAL_DRIVERS,
} from './action-types';
import { eventToEditableAdapter, eventFromEditableAdapter } from './adapters';

// Setters

export const setModelList = modelList => ({
  type: SET_MODEL_LIST,
  modelList,
});

export const setPendingModelList = pendingModelList => ({
  type: SET_PENDING_MODEL_LIST,
  pendingModelList,
});

export const setEditableModel = editableModel => ({
  type: SET_EDITABLE_MODEL,
  editableModel: editableModel ? eventToEditableAdapter(editableModel) : null,
});

export const setInternalDrivers = users => ({
  type: SET_INTERNAL_DRIVERS,
  users,
});

export const setExternalDrivers = etcs => ({
  type: SET_EXTERNAL_DRIVERS,
  etcs,
});

// Getters

export const getEvents = (status, page, orderBy, order) => (dispatch) => {
  const currentPage = page || 0;
  return axios.get('bidding', {
    params: {
      status,
      page: currentPage + 1,
      ...(orderBy && order ? { order_by: orderBy, order } : {}),
    },
  })
    .then(response => dispatch(setModelList(response.data)));
};

export const getPendingEvents = () => dispatch =>
  axios.get('bidding', {
    params: {
      status: 'pending',
    },
  })
    .then(response => dispatch(setPendingModelList(response.data.data)));

export const getInternalDrivers = () => dispatch =>
  axios.get('users', {
    params: {
      role_ids: roles['Master User'],
    },
  })
    .then((response) => {
      dispatch(setInternalDrivers(response.data.data));
    });

export const getExternalDrivers = () => (dispatch, getState) =>
  axios.get('etcs', {
    params: {
      facility_id: getState().facilityReducer.selectedFacility.id,
    },
  })
    .then((response) => {
      dispatch(setExternalDrivers(response.data.data));
    });

// Manipulators

export const assignDrivers = model => (dispatch) => {
  const event = eventFromEditableAdapter(model);
  const attributes = {
    transportation_type: event.attributes.transportation_type,
    drivers: event.attributes.drivers,
  };
  return axios.post(
    `bidding/assign-drivers/${event.id}`,
    {
      data: {
        type: 'events',
        attributes,
      },
    },
  ).then(() => {
    dispatch(setEditableModel(null));
  });
};

export const declineAllDrivers = eventId => dispatch =>
  axios.delete(`bidding/decline-all-drivers/${eventId}`)
    .then(() => dispatch(getEvents()));

export const acceptDriver = id => dispatch =>
  axios.put(`bidding/accept-driver/${id}`)
    .then(() => dispatch(getEvents()));

export const updateFee = (id, fee) => dispatch =>
  axios.put(`bidding/update-fee/${id}`, {
    data: {
      type: 'drivers',
      attributes: {
        fee,
      },
    },
  })
    .then(() => dispatch(getEvents()));
