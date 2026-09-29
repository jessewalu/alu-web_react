import { bindActionCreators } from 'redux';
import store from '../store/store';
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
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
