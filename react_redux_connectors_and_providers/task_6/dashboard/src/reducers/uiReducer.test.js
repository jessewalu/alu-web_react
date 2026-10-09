import { Map } from 'immutable';
import { uiReducer, initialState } from './uiReducer';
import { SELECT_COURSE } from '../actions/courseActionTypes';
import {
  LOGIN,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/uiActionTypes';

const initialJS = {
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
};

describe('uiReducer', () => {
  it('returns the initial state when no action is passed', () => {
    expect(Map.isMap(initialState)).toBe(true);
    expect(uiReducer(undefined, {}).toJS()).toEqual(initialJS);
    expect(uiReducer().toJS()).toEqual(initialJS);
  });

  it('returns the initial state when the action SELECT_COURSE is passed', () => {
    const state = uiReducer(undefined, { type: SELECT_COURSE, index: 1 });
    expect(state).toBe(initialState);
    expect(state.toJS()).toEqual(initialJS);
  });

  it('changes isNotificationDrawerVisible when DISPLAY_NOTIFICATION_DRAWER is passed', () => {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state.toJS()).toEqual({ ...initialJS, isNotificationDrawerVisible: true });
  });

  it('sets isNotificationDrawerVisible to false on HIDE_NOTIFICATION_DRAWER', () => {
    const opened = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    const state = uiReducer(opened, { type: HIDE_NOTIFICATION_DRAWER });
    expect(state.toJS()).toEqual(initialJS);
  });

  it('sets isUserLoggedIn to true on LOGIN_SUCCESS', () => {
    const state = uiReducer(undefined, { type: LOGIN_SUCCESS });
    expect(state.toJS()).toEqual({ ...initialJS, isUserLoggedIn: true });
  });

  it('sets isUserLoggedIn to false on LOGIN_FAILURE and LOGOUT', () => {
    const loggedIn = uiReducer(undefined, { type: LOGIN_SUCCESS });
    expect(uiReducer(loggedIn, { type: LOGIN_FAILURE }).get('isUserLoggedIn')).toBe(false);
    expect(uiReducer(loggedIn, { type: LOGOUT }).get('isUserLoggedIn')).toBe(false);
  });

  it('returns a new Map and leaves the previous state untouched', () => {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state).not.toBe(initialState);
    expect(initialState.get('isNotificationDrawerVisible')).toBe(false);
  });

  it('sets the user passed within the action on LOGIN', () => {
    const user = { email: 'jesse@example.com', password: 'secret' };
    const state = uiReducer(undefined, { type: LOGIN, user });
    expect(state.get('user')).toEqual(user);
    expect(state.get('isUserLoggedIn')).toBe(false);
  });

  it('sets the user to null and logs the user out on LOGOUT', () => {
    const user = { email: 'jesse@example.com', password: 'secret' };
    const loggedIn = uiReducer(
      uiReducer(undefined, { type: LOGIN, user }),
      { type: LOGIN_SUCCESS },
    );
    const state = uiReducer(loggedIn, { type: LOGOUT });
    expect(state.get('user')).toBeNull();
    expect(state.get('isUserLoggedIn')).toBe(false);
  });
});
