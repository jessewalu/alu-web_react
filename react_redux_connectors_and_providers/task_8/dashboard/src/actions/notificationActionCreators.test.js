import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  markAsAread,
  markAsARead,
  setNotificationFilter,
  setLoadingState,
  setNotifications,
  fetchNotifications,
} from './notificationActionCreators';
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_LOADING_STATE,
  NotificationTypeFilters,
} from './notificationActionTypes';

describe('notification action creators', () => {
  it('markAsAread returns the MARK_AS_READ action with the index', () => {
    expect(markAsAread(1)).toEqual({
      type: MARK_AS_READ,
      index: 1,
    });
  });

  it('markAsARead is the same creator under the alternative spelling', () => {
    expect(markAsARead).toBe(markAsAread);
  });

  it('setNotificationFilter returns the SET_TYPE_FILTER action with the DEFAULT filter', () => {
    expect(setNotificationFilter(NotificationTypeFilters.DEFAULT)).toEqual({
      type: SET_TYPE_FILTER,
      filter: 'DEFAULT',
    });
  });

  it('setNotificationFilter returns the SET_TYPE_FILTER action with the URGENT filter', () => {
    expect(setNotificationFilter(NotificationTypeFilters.URGENT)).toEqual({
      type: SET_TYPE_FILTER,
      filter: 'URGENT',
    });
  });
});

describe('NotificationTypeFilters', () => {
  it('contains the DEFAULT and URGENT filter states', () => {
    expect(NotificationTypeFilters).toEqual({
      DEFAULT: 'DEFAULT',
      URGENT: 'URGENT',
    });
  });
});

describe('notification async action creators', () => {
  const mockStore = configureStore([thunk]);
  const apiData = [
    {
      id: 'n1',
      author: { id: 'u1', name: { first: 'Poole', last: 'Sanders' } },
      context: {
        guid: 'g1', isRead: false, type: 'default', value: 'New course available',
      },
    },
  ];

  afterEach(() => {
    fetchMock.restore();
  });

  it('setLoadingState returns the SET_LOADING_STATE action with the boolean', () => {
    expect(setLoadingState(true)).toEqual({ type: SET_LOADING_STATE, loading: true });
    expect(setLoadingState(false)).toEqual({ type: SET_LOADING_STATE, loading: false });
  });

  it('setNotifications returns the FETCH_NOTIFICATIONS_SUCCESS action with the data', () => {
    expect(setNotifications(apiData)).toEqual({
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: apiData,
    });
  });

  it('fetchNotifications sets the loading state, fetches the API and resets the loading state', () => {
    fetchMock.getOnce('/notifications.json', apiData);
    const store = mockStore({});

    return store.dispatch(fetchNotifications()).then(() => {
      expect(store.getActions()).toEqual([
        { type: SET_LOADING_STATE, loading: true },
        { type: FETCH_NOTIFICATIONS_SUCCESS, data: apiData },
        { type: SET_LOADING_STATE, loading: false },
      ]);
    });
  });

  it('fetchNotifications still resets the loading state when the request fails', () => {
    fetchMock.getOnce('/notifications.json', { throws: new Error('Network error') });
    const store = mockStore({});

    return store.dispatch(fetchNotifications()).then(() => {
      expect(store.getActions()).toEqual([
        { type: SET_LOADING_STATE, loading: true },
        { type: SET_LOADING_STATE, loading: false },
      ]);
    });
  });
});
