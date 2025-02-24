import axios from 'axios';
import {
  SET_MODEL_LIST,
  ADD_NEW_MODEL,
  UPDATE_MODEL,
  REMOVE_MODEL_FROM_LIST,
  SET_EDITABLE_MODEL,
  SET_DELETABLE_MODEL,
  SET_SEARCH_KEY,
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

export const setWarningMessage = warningMessage => ({
  type: SET_WARNING_MESSAGE,
  warningMessage,
});

// Getters

export const getLocationList = (facility, page, filter, orderBy, order) =>
  (dispatch, getState) =>
    axios.get('locations', {
      params: {
        facility_id:
          (facility && facility.id) ? facility.id : getState().facilityReducer.selectedFacility.id,
        ...(filter ? { search_key: filter } : {}),
        ...((page || page === 0) ? { page: page + 1 } : {}),
        ...(orderBy && order ? { order_by: orderBy, order } : {}),
      },
    })
      .then(response => dispatch(setModelList(response.data)));

// Manipulators

export const saveModel = model => (dispatch, getState) => {
  const attributes = Object.assign(
    {},
    model.attributes,
    { facility_id: getState().facilityReducer.selectedFacility.id },
  );

  if (model.id) {
    return axios.put(`locations/${model.id}`, {
      data: {
        type: 'locations',
        attributes,
      },
    })
      .then((response) => {
        dispatch(updateModel(response.data.data));
        dispatch(setEditableModel(null));
      });
  }
  return axios.post('locations', {
    data: {
      type: 'locations',
      attributes,
    },
  })
    .then((response) => {
      dispatch(addNewModel(response.data.data));
      dispatch(setEditableModel(null));
    });
};

export const addLocation = (model, facility) => (dispatch, getState) => {
  let currentFacility = facility;
  if (!currentFacility) {
    currentFacility = getState().facilityReducer.selectedFacility;
  }
  const attributes = Object.assign(
    {},
    model.attributes,
    { facility_id: currentFacility.id },
  );
  return axios.post('locations', {
    data: {
      type: 'locations',
      attributes,
    },
  })
    .then((response) => {
      dispatch(addNewModel(response.data.data));
      dispatch(setEditableModel(null));
    });
};

export const deleteModel = id => dispatch =>
  axios.delete(`locations/${id}`)
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
    'locations/import',
    formData,
  );
};
