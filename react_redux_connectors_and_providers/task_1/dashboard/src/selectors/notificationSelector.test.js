import { Map } from 'immutable';
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
} from './notificationSelector';
import { notificationReducer } from '../reducers/notificationReducer';
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

describe('notification selectors', () => {
  let state;

  beforeEach(() => {
    state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
  });

  it('filterTypeSelected returns the value of the filter', () => {
    expect(filterTypeSelected(state)).toBe('DEFAULT');

    const urgent = notificationReducer(state, {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });
    expect(filterTypeSelected(urgent)).toBe('URGENT');
  });

  it('getNotifications returns the notifications within the reducer as a Map', () => {
    const notifications = getNotifications(state);
    expect(Map.isMap(notifications)).toBe(true);
    expect(notifications.toJS()).toEqual({
      1: { id: 1, isRead: false, type: 'default', value: 'New course available' },
      2: { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
      3: { id: 3, isRead: false, type: 'urgent', value: 'New data available' },
    });
  });

  it('getNotifications returns an empty Map when nothing was fetched', () => {
    expect(getNotifications(notificationReducer(undefined, {})).toJS()).toEqual({});
  });

  it('getUnreadNotifications returns every notification as a Map when none is read', () => {
    const unread = getUnreadNotifications(state);
    expect(Map.isMap(unread)).toBe(true);
    expect(unread.size).toBe(3);
  });

  it('getUnreadNotifications returns only the unread notifications within the reducer', () => {
    const next = notificationReducer(state, { type: MARK_AS_READ, index: 2 });
    const unread = getUnreadNotifications(next);
    expect(Map.isMap(unread)).toBe(true);
    expect(unread.toJS()).toEqual({
      1: { id: 1, isRead: false, type: 'default', value: 'New course available' },
      3: { id: 3, isRead: false, type: 'urgent', value: 'New data available' },
    });
  });
});
