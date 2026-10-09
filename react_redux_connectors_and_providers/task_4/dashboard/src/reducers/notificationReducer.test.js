import { Map } from 'immutable';
import { notificationReducer } from './notificationReducer';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from '../actions/notificationActionTypes';

const data = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'New data available' },
];

const fetched = {
  filter: 'DEFAULT',
  notifications: {
    1: { id: 1, isRead: false, type: 'default', value: 'New course available' },
    2: { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
    3: { id: 3, isRead: false, type: 'urgent', value: 'New data available' },
  },
};

describe('notificationReducer', () => {
  it('returns the default state as a Map with no notifications and the DEFAULT filter', () => {
    const state = notificationReducer(undefined, {});
    expect(Map.isMap(state)).toBe(true);
    expect(state.toJS()).toEqual({ filter: 'DEFAULT', notifications: {} });
    expect(notificationReducer().toJS()).toEqual({ filter: 'DEFAULT', notifications: {} });
  });

  it('normalizes and merges the data passed with FETCH_NOTIFICATIONS_SUCCESS', () => {
    const state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    expect(state.toJS()).toEqual(fetched);
  });

  it('updates the right item with MARK_AS_READ', () => {
    const state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    const next = notificationReducer(state, { type: MARK_AS_READ, index: 2 });
    expect(next.toJS()).toEqual({
      filter: 'DEFAULT',
      notifications: {
        1: { id: 1, isRead: false, type: 'default', value: 'New course available' },
        2: { id: 2, isRead: true, type: 'urgent', value: 'New resume available' },
        3: { id: 3, isRead: false, type: 'urgent', value: 'New data available' },
      },
    });
  });

  it('updates the filter with SET_TYPE_FILTER', () => {
    const state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    const next = notificationReducer(state, {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });
    expect(next.toJS()).toEqual({ ...fetched, filter: 'URGENT' });
  });

  it('returns a new Map and leaves the previous state untouched', () => {
    const state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    const next = notificationReducer(state, { type: MARK_AS_READ, index: 1 });
    expect(next).not.toBe(state);
    expect(state.getIn(['notifications', '1', 'isRead'])).toBe(false);
  });
});
