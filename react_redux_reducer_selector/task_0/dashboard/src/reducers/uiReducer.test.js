import { uiReducer, initialState } from './uiReducer';
import { SELECT_COURSE } from '../actions/courseActionTypes';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/uiActionTypes';

describe('uiReducer', () => {
  it('returns the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
    expect(uiReducer()).toEqual(initialState);
    expect(initialState).toEqual({
      isNotificationDrawerVisible: false,
      isUserLoggedIn: false,
      user: {},
    });
  });

  it('returns the initial state when the action SELECT_COURSE is passed', () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE, index: 1 })).toEqual(initialState);
  });

  it('changes isNotificationDrawerVisible when DISPLAY_NOTIFICATION_DRAWER is passed', () => {
    expect(uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER })).toEqual({
      ...initialState,
      isNotificationDrawerVisible: true,
    });
  });

  it('sets isNotificationDrawerVisible to false on HIDE_NOTIFICATION_DRAWER', () => {
    const state = { ...initialState, isNotificationDrawerVisible: true };
    expect(uiReducer(state, { type: HIDE_NOTIFICATION_DRAWER })).toEqual(initialState);
  });

  it('sets isUserLoggedIn to true on LOGIN_SUCCESS', () => {
    expect(uiReducer(undefined, { type: LOGIN_SUCCESS })).toEqual({
      ...initialState,
      isUserLoggedIn: true,
    });
  });

  it('sets isUserLoggedIn to false on LOGIN_FAILURE and LOGOUT', () => {
    const state = { ...initialState, isUserLoggedIn: true };
    expect(uiReducer(state, { type: LOGIN_FAILURE }).isUserLoggedIn).toBe(false);
    expect(uiReducer(state, { type: LOGOUT }).isUserLoggedIn).toBe(false);
  });

  it('does not mutate the previous state', () => {
    const state = Object.freeze({ ...initialState });
    const next = uiReducer(state, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(next).not.toBe(state);
    expect(state.isNotificationDrawerVisible).toBe(false);
  });
});
