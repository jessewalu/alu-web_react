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

  it('getUnreadNotifications returns only the unread message entities as a Map', () => {
    const unread = getUnreadNotifications(state);
    expect(Map.isMap(unread)).toBe(true);
    expect(unread.keySeq().toArray()).toEqual(['g1', 'g2']);
  });

  it('getUnreadNotifications no longer returns a notification once it is marked as read', () => {
    const next = notificationReducer(state, { type: MARK_AS_READ, index: 'g2' });
    const unread = getUnreadNotifications(next);
    expect(unread.toJS()).toEqual({
      g1: { guid: 'g1', isRead: false, type: 'default', value: 'New course available' },
    });
  });
});
