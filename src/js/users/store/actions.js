import axios from 'axios';
import {
  SET_MODEL_LIST,
  ADD_NEW_MODEL,
  UPDATE_MODEL,
  REMOVE_MODEL_FROM_LIST,
  SET_EDITABLE_MODEL,
  SET_RESETABLE_MODEL,
  SET_DELETABLE_MODEL,
  SET_WARNING_MESSAGE,

  SET_PARENT_ORGANIZATION,
  SET_USER_ROLE,
  SET_USER_ROLES,
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


export const setResetableModel = resetableModel => ({
  type: SET_RESETABLE_MODEL,
  resetableModel,
});

export const setDeletableModel = deletableModel => ({
  type: SET_DELETABLE_MODEL,
  deletableModel,
});

export const setParentOrganization = parentOrganization => ({
  type: SET_PARENT_ORGANIZATION,
  parentOrganization,
});

export const setUserRole = userRole => ({
  type: SET_USER_ROLE,
  userRole,
});

export const setUserRoles = userRoles => ({
  type: SET_USER_ROLES,
  userRoles,
});

export const setWarningMessage = warningMessage => ({
  type: SET_WARNING_MESSAGE,
  warningMessage,
});

// Getters

export const getUserList = (
  parentOrganizationId,
  parentFacilityId,
  roleIds,
  page,
  orderBy,
  order,
) =>
  dispatch =>
    axios.get('users', {
      params: {
        organization_id: parentOrganizationId,
        facility_id: parentFacilityId,
        role_ids: roleIds,
        ...((page || page === 0) ? { page: page + 1 } : {}),
        order_by: orderBy,
        order,
      },
    })
      .then((response) => {
        dispatch(setModelList(response.data));
      });

export const getParentOrganization = id => dispatch =>
  axios.get(`organizations/${id}`)
    .then((response) => {
      dispatch(setParentOrganization(response.data.data));
    });

// Manipulators

export const saveModel = model => (dispatch) => {
  if (model.id) {
    const attributes = {
      first_name: model.attributes.first_name,
      middle_name: model.attributes.middle_name,
      last_name: model.attributes.last_name,
      phone: model.attributes.phone,
      role_id: model.attributes.role_id,
      color_id: model.attributes.color_id !== 0 ? model.attributes.color_id : null,
    };
    return axios.put(`users/${model.id}`, {
      data: {
        type: 'users',
        attributes,
      },
    })
      .then((response) => {
        dispatch(updateModel(response.data.data));
        dispatch(setEditableModel(null));
      });
  }
  return axios.post('users', {
    data: {
      type: 'users',
      attributes: model.attributes,
    },
  })
    .then((response) => {
      dispatch(addNewModel(response.data.data));
      dispatch(setEditableModel(null));
    });
};

export const deleteModel = id => dispatch =>
  axios.delete(`users/${id}`)
    .then(() => {
      dispatch(removeModelFromList(id));
      dispatch(setDeletableModel(null));
    }).catch((error) => {
      if (error.response) {
        dispatch(setWarningMessage(error.response.data.errors[0].detail));
        dispatch(setDeletableModel(null));
      }
    });

export const resetPassword = id => dispatch =>
  axios.put(`users/reset-password/${id}`)
    .then(() => dispatch(setResetableModel(null)));
