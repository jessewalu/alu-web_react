import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
} from './uiActionCreators';
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from './uiActionTypes';

describe('ui action creators', () => {
  it('login returns the LOGIN action with the user object', () => {
    expect(login('jesse@example.com', 'secret')).toEqual({
      type: LOGIN,
      user: { email: 'jesse@example.com', password: 'secret' },
    });
  });

  it('logout returns the LOGOUT action', () => {
    expect(logout()).toEqual({ type: LOGOUT });
  });

  it('displayNotificationDrawer returns the DISPLAY_NOTIFICATION_DRAWER action', () => {
    expect(displayNotificationDrawer()).toEqual({
      type: DISPLAY_NOTIFICATION_DRAWER,
    });
  });

  it('hideNotificationDrawer returns the HIDE_NOTIFICATION_DRAWER action', () => {
    expect(hideNotificationDrawer()).toEqual({
      type: HIDE_NOTIFICATION_DRAWER,
    });
  });
});
