import { notificationReducer, initialState } from './notificationReducer';
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

const fetchedNotifications = [
  { id: 1, isRead: false, type: 'default', value: 'New course available' },
  { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
  { id: 3, isRead: false, type: 'urgent', value: 'New data available' },
];

describe('notificationReducer', () => {
  it('returns the default state with no notifications and the DEFAULT filter', () => {
    expect(notificationReducer(undefined, {})).toEqual({
      filter: 'DEFAULT',
      notifications: [],
    });
    expect(notificationReducer()).toEqual(initialState);
  });

  it('returns the data passed with FETCH_NOTIFICATIONS_SUCCESS and isRead set to false', () => {
    expect(
      notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data }),
    ).toEqual({
      filter: 'DEFAULT',
      notifications: fetchedNotifications,
    });
  });

  it('updates the right item with MARK_AS_READ', () => {
    const state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    expect(notificationReducer(state, { type: MARK_AS_READ, index: 2 })).toEqual({
      filter: 'DEFAULT',
      notifications: [
        { id: 1, isRead: false, type: 'default', value: 'New course available' },
        { id: 2, isRead: true, type: 'urgent', value: 'New resume available' },
        { id: 3, isRead: false, type: 'urgent', value: 'New data available' },
      ],
    });
  });

  it('updates the filter with SET_TYPE_FILTER', () => {
    const state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    expect(
      notificationReducer(state, {
        type: SET_TYPE_FILTER,
        filter: NotificationTypeFilters.URGENT,
      }),
    ).toEqual({
      filter: 'URGENT',
      notifications: fetchedNotifications,
    });
  });

  it('does not mutate the previous state', () => {
    const state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    Object.freeze(state);
    Object.freeze(state.notifications);
    state.notifications.forEach(Object.freeze);
    const next = notificationReducer(state, { type: MARK_AS_READ, index: 1 });
    expect(next).not.toBe(state);
    expect(state.notifications[0].isRead).toBe(false);
  });
});
