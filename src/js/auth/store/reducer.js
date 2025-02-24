import store from 'store/create-store';
import { refreshToken, logout } from './actions';
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
import User from '../models/user';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVABLE_USER_DATA: {
      return Object.assign({}, state, { activableUser: action.user });
    }
    case SET_USER_DATA: // Passthrough
    case UPDATE_USER_DATA: {
      return Object.assign({}, state, { journeyUser: Object.assign(new User(), action.user) });
    }
    case SET_FORGOT_PASSWORD_ERROR: {
      return Object.assign({}, state, { forgotPasswordError: action.message });
    }
    case SET_RESET_PASSWORD_ERROR: {
      return Object.assign({}, state, { resetPasswordError: action.message });
    }
    case SET_CHANGE_PASSWORD_ERROR: {
      return Object.assign({}, state, { changePasswordError: action.message });
    }
    case SET_LOGIN_ERROR: {
      return Object.assign({}, state, { loginError: action.message });
    }
    case SET_ACCESS_TOKEN: {
      localStorage.setItem('accessToken', action.token);
      return Object.assign({}, state, { accessToken: action.token });
    }
    case SET_TOKEN_TIMER: {
      let { tokenTimerId } = state;
      if (!tokenTimerId && state.accessToken) {
        tokenTimerId = window.setInterval(() => {
          store.dispatch(refreshToken());
        }, action.length * 60 * 1000);
      }
      return Object.assign({}, state, { tokenTimerId });
    }
    case SET_ACTIVITY_TIMER: {
      let { activityTimerId } = state;
      if (activityTimerId) {
        clearTimeout(activityTimerId);
      }
      activityTimerId = window.setTimeout(() => {
        store.dispatch(logout());
      }, action.length * 60 * 1000);
      return Object.assign({}, state, { activityTimerId });
    }
    default:
      return state;
  }
};

export default authReducer;
