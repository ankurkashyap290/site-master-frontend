import axios from 'axios';
import {
  SET_MODEL_LIST,
  ADD_NEW_MODEL,
  UPDATE_MODEL,
  REMOVE_MODEL_FROM_LIST,
  SET_EDITABLE_MODEL,
  SET_DELETABLE_MODEL,
  SET_SEARCH_KEY,
  SET_DETAILS,
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

export const setSearchKey = searchKey => ({
  type: SET_SEARCH_KEY,
  searchKey,
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

export const getClientList = (facility, page, filter, orderBy, order) =>
  (dispatch, getState) =>
    axios.get('clients', {
      params: {
        facility_id: facility || getState().facilityReducer.selectedFacility.id,
        ...(filter && filter !== '' ? { search_key: filter || '' } : {}),
        ...((page || page === 0) ? { page: page + 1 } : {}),
        ...(orderBy && order ? { order_by: orderBy, order } : {}),
      },
    })
      .then(response => dispatch(setModelList(response.data)));

// Manipulators

export const saveModel = model => (dispatch) => {
  const attributes = {
    first_name: model.attributes.first_name,
    middle_name: model.attributes.middle_name,
    last_name: model.attributes.last_name,
    room_number: model.attributes.room_number,
    responsible_party_email: model.attributes.responsible_party_email,
  };
  if (model.id) {
    return axios.put(`clients/${model.id}`, {
      data: {
        type: 'clients',
        attributes,
      },
    })
      .then((response) => {
        dispatch(updateModel(response.data.data));
        dispatch(setEditableModel(null));
      });
  }
  attributes.facility_id = model.attributes.facility_id;
  return axios.post('clients', {
    data: {
      type: 'clients',
      attributes,
    },
  })
    .then((response) => {
      dispatch(addNewModel(response.data.data));
      dispatch(setEditableModel(null));
    });
};

export const deleteModel = id => dispatch =>
  axios.delete(`clients/${id}`)
    .then(() => {
      dispatch(removeModelFromList(id));
      dispatch(setDeletableModel(null));
    }).catch((error) => {
      if (error.response) {
        dispatch(setWarningMessage(error.response.data.errors[0].detail));
        dispatch(setDeletableModel(null));
      }
    });

export const importCSV = file => () => {
  const formData = new FormData();
  formData.append('csv', file);
  return axios.post(
    'clients/import',
    formData,
  );
};
