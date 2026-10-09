import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginSuccess,
  loginFailure,
  loginRequest,
} from './uiActionCreators';
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
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

  it('loginSuccess returns the LOGIN_SUCCESS action', () => {
    expect(loginSuccess()).toEqual({ type: LOGIN_SUCCESS });
  });

  it('loginFailure returns the LOGIN_FAILURE action', () => {
    expect(loginFailure()).toEqual({ type: LOGIN_FAILURE });
  });
});

describe('loginRequest', () => {
  const mockStore = configureStore([thunk]);
  const email = 'jesse@example.com';
  const password = 'secret';

  afterEach(() => {
    fetchMock.restore();
  });

  it('dispatches LOGIN and LOGIN_SUCCESS when the API returns the right response', () => {
    fetchMock.getOnce('/login-success.json', {
      body: {
        first_name: 'Johann',
        last_name: 'Salva',
        email: 'johann.salva@holberton.nz',
        profile_picture: 'http://placehold.it/32x32',
      },
      status: 200,
    });

    const store = mockStore({});

    return store.dispatch(loginRequest(email, password)).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOGIN, user: { email, password } },
        { type: LOGIN_SUCCESS },
      ]);
    });
  });

  it('dispatches LOGIN and LOGIN_FAILURE when the API query fails', () => {
    fetchMock.getOnce('/login-success.json', 500);

    const store = mockStore({});

    return store.dispatch(loginRequest(email, password)).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOGIN, user: { email, password } },
        { type: LOGIN_FAILURE },
      ]);
    });
  });

  it('dispatches LOGIN and LOGIN_FAILURE when the network request throws', () => {
    fetchMock.getOnce('/login-success.json', { throws: new Error('Network error') });

    const store = mockStore({});

    return store.dispatch(loginRequest(email, password)).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOGIN, user: { email, password } },
        { type: LOGIN_FAILURE },
      ]);
    });
  });
});
