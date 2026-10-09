import { Map } from 'immutable';
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotificationsByType,
} from './notificationSelector';
import { notificationReducer } from '../reducers/notificationReducer';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from '../actions/notificationActionTypes';

const data = [
  {
    id: 'n1',
    author: { id: 'u1', name: { first: 'Poole', last: 'Sanders' } },
    context: {
      guid: 'g1', isRead: false, type: 'default', value: 'New course available',
    },
  },
  {
    id: 'n2',
    author: { id: 'u2', name: { first: 'Norton', last: 'Grimes' } },
    context: {
      guid: 'g2', isRead: false, type: 'urgent', value: 'New resume available',
    },
  },
  {
    id: 'n3',
    author: { id: 'u3', name: { first: 'Roach', last: 'Cameron' } },
    context: {
      guid: 'g3', isRead: true, type: 'urgent', value: 'New data available',
    },
  },
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

  it('getNotifications returns the message entities within the reducer as a Map', () => {
    const notifications = getNotifications(state);
    expect(Map.isMap(notifications)).toBe(true);
    expect(notifications.toJS()).toEqual({
      g1: { guid: 'g1', isRead: false, type: 'default', value: 'New course available' },
      g2: { guid: 'g2', isRead: false, type: 'urgent', value: 'New resume available' },
      g3: { guid: 'g3', isRead: true, type: 'urgent', value: 'New data available' },
    });
  });

  it('getNotifications returns an empty Map when nothing was fetched', () => {
    expect(getNotifications(notificationReducer(undefined, {})).toJS()).toEqual({});
  });

  it('getUnreadNotificationsByType returns every unread notification when the filter is DEFAULT', () => {
    const unread = getUnreadNotificationsByType(state);
    expect(Map.isMap(unread)).toBe(true);
    expect(unread.keySeq().toArray()).toEqual(['g1', 'g2']);
  });

  it('getUnreadNotificationsByType returns the unread urgent notifications when the filter is URGENT', () => {
    const urgent = notificationReducer(state, {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });
    const unread = getUnreadNotificationsByType(urgent);
    expect(Map.isMap(unread)).toBe(true);
    expect(unread.toJS()).toEqual({
      g2: { guid: 'g2', isRead: false, type: 'urgent', value: 'New resume available' },
    });
  });

  it('getUnreadNotificationsByType no longer returns a notification once it is marked as read', () => {
    const next = notificationReducer(state, { type: MARK_AS_READ, index: 'g2' });
    expect(getUnreadNotificationsByType(next).keySeq().toArray()).toEqual(['g1']);
  });

  it('getUnreadNotificationsByType is memoized while the filter and notifications are unchanged', () => {
    expect(getUnreadNotificationsByType(state)).toBe(getUnreadNotificationsByType(state));
    const loading = notificationReducer(state, { type: 'SET_LOADING_STATE', loading: true });
    expect(getUnreadNotificationsByType(loading)).toBe(getUnreadNotificationsByType(state));
  });
});
