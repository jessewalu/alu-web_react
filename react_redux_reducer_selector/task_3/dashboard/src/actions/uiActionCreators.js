import { bindActionCreators } from 'redux';
import store from '../store/store';
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './uiActionTypes';

export const login = (email, password) => ({
  type: LOGIN,
  user: { email, password },
});

export const logout = () => ({
  type: LOGOUT,
});

export const displayNotificationDrawer = () => ({
  type: DISPLAY_NOTIFICATION_DRAWER,
});

export const hideNotificationDrawer = () => ({
  type: HIDE_NOTIFICATION_DRAWER,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const loginRequest = (email, password) => (dispatch) => {
  dispatch(login(email, password));

  return fetch('/login-success.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return dispatch(loginSuccess());
    })
    .catch(() => dispatch(loginFailure()));
};

export const boundLogin = bindActionCreators(login, store.dispatch);

export const boundLogout = bindActionCreators(logout, store.dispatch);

export const boundDisplayNotificationDrawer = bindActionCreators(
  displayNotificationDrawer,
  store.dispatch,
);

export const boundHideNotificationDrawer = bindActionCreators(
  hideNotificationDrawer,
  store.dispatch,
);
