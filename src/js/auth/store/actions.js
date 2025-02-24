import axios from 'axios';
import frontend from '../../config/frontend';
import jwt from '../../config/jwt';

import {
  SET_ACTIVABLE_USER_DATA,
  SET_USER_DATA,
  UPDATE_USER_DATA,
  SET_LOGIN_ERROR,
  SET_FORGOT_PASSWORD_ERROR,
  SET_RESET_PASSWORD_ERROR,
  SET_CHANGE_PASSWORD_ERROR,
  SET_ACCESS_TOKEN,
  SET_TOKEN_TIMER,
  SET_ACTIVITY_TIMER,
} from './action-types';
import initialState from './initial-state';
import { userSkeleton } from '../../store/skeletons';

export const setActivableUserData = user => ({
  type: SET_ACTIVABLE_USER_DATA,
  user,
});

export const setUserData = user => ({
  type: SET_USER_DATA,
  user,
});

export const updateUserData = user => ({
  type: UPDATE_USER_DATA,
  user,
});

export const setForgotPasswordError = message => ({
  type: SET_FORGOT_PASSWORD_ERROR,
  message,
});

export const resetPasswordError = message => ({
  type: SET_RESET_PASSWORD_ERROR,
  message,
});

export const changePasswordError = message => ({
  type: SET_CHANGE_PASSWORD_ERROR,
  message,
});

export const setLoginError = message => ({
  type: SET_LOGIN_ERROR,
  message,
});

export const setAccessToken = token => ({
  type: SET_ACCESS_TOKEN,
  token,
});

export const setTokenTimer = () => ({
  type: SET_TOKEN_TIMER,
  length: jwt.ttl - 1, // timer for refresh token = token TTL - 1 minute
});

export const setActivityTimer = () => ({
  type: SET_ACTIVITY_TIMER,
  length: jwt.ttl, // for now, activity timer = token TTL
});

axios.defaults.baseURL = frontend.apiEndpoint;

if (initialState.accessToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${initialState.accessToken}`;
}

export const getActivableUser = (id, token) => dispatch =>
  axios.post('activation/activable-user', {
    data: {
      type: 'users',
      attributes: {
        id,
        token,
      },
    },
  }).then((response) => {
    dispatch(setActivableUserData(response.data.data));
  }).catch(() => {
    dispatch(setActivableUserData(Object.assign({}, userSkeleton)));
  });

export const activateUser = (id, token, password) => dispatch =>
  axios.post('activation/activate-user', {
    data: {
      type: 'users',
      attributes: {
        id,
        token,
        password,
      },
    },
  }).then((response) => {
    dispatch(setAccessToken(response.data.data.attributes.access_token));
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.attributes.access_token}`;
    dispatch(setUserData(response.data.data));
    dispatch(setLoginError(''));
  }).catch(() => {
    //
  });

export const forgotPassword = email => dispatch =>
  axios.post('auth/forgot-password', {
    data: {
      type: 'forgot-password',
      attributes: {
        email,
      },
    },
  })
    .then(() => {
      dispatch(setForgotPasswordError(''));
    })
    .catch((error) => {
      dispatch(setForgotPasswordError(error.response.data.errors[0].detail));
    });

export const resetPassword = (token, password) => dispatch =>
  axios.post('auth/reset-password', {
    data: {
      type: 'reset-password',
      attributes: {
        token,
        password,
      },
    },
  })
    .then(() => {
      dispatch(resetPasswordError(''));
    })
    .catch((error) => {
      dispatch(resetPasswordError(error.response.data.errors[0].detail));
    });

export const changePassword = (oldPassword, newPassword) => dispatch =>
  axios.post('auth/change-password', {
    data: {
      type: 'change-password',
      attributes: {
        old_password: oldPassword,
        new_password: newPassword,
      },
    },
  })
    .then(() => {
      dispatch(changePasswordError(''));
    })
    .catch((error) => {
      dispatch(changePasswordError(error.response.data.errors[0].detail));
    });

export const login = (email, password) => dispatch =>
  axios.post('auth/login', {
    data: {
      type: 'login',
      attributes: {
        email,
        password,
      },
    },
  })
    .then((response) => {
      dispatch(setAccessToken(response.data.data.attributes.access_token));
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.attributes.access_token}`;
      dispatch(setUserData(response.data.data));
      dispatch(setLoginError(''));
    })
    .catch((error) => {
      dispatch(setLoginError(error.response.data.errors[0].detail));
    });

export const refreshToken = () => dispatch =>
  axios.post('auth/refresh')
    .then((response) => {
      dispatch(setAccessToken(response.data.data.attributes.access_token));
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.attributes.access_token}`;
    });

export const getUser = () => (dispatch, getState) => {
  const { authReducer } = getState();
  if (!authReducer.accessToken) {
    dispatch(setUserData(Object.assign({}, userSkeleton)));
  }
  axios.get('auth/me')
    .then((response) => {
      dispatch(updateUserData(response.data.data));
    })
    .catch(() => {
      dispatch(setAccessToken(''));
      dispatch(setUserData(Object.assign({}, userSkeleton)));
    });
};

export const logout = () => dispatch =>
  axios.post('auth/logout')
    .then(() => { axios.defaults.headers.common.Authorization = ''; })
    .then(() => dispatch({ type: 'RESET' }))
    .catch(() => {});
