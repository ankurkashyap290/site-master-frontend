import axios from 'axios';
import {
  SET_MODEL_LIST,
  UPDATE_MODEL,
  SET_EDITABLE_MODEL,
} from './action-types';

// Setters

export const setModelList = modelList => ({
  type: SET_MODEL_LIST,
  modelList,
});

export const updateModel = model => ({
  type: UPDATE_MODEL,
  model,
});

export const setEditableModel = editableModel => ({
  type: SET_EDITABLE_MODEL,
  editableModel,
});

// Getters

export const getPolicyList = parentFacilityId => dispatch =>
  axios.get(`policies?facility_id=${parentFacilityId}`)
    .then((response) => {
      dispatch(setModelList(response.data.data));
    });

// Manipulators

export const saveModel = model => (dispatch) => {
  if (model.id) {
    const attributes = {
      view: model.attributes.view,
      create: model.attributes.create,
      update: model.attributes.update,
      delete: model.attributes.delete,
    };
    return axios.put(`policies/${model.id}`, {
      data: {
        type: 'policies',
        attributes,
      },
    })
      .then((response) => {
        dispatch(updateModel(response.data.data));
        dispatch(setEditableModel(null));
      });
  }
  // eslint-disable-next-line
  return console.error('Policies can not be created.');
};
