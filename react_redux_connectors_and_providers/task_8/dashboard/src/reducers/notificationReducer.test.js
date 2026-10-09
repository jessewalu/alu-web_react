import { Map } from 'immutable';
import { notificationReducer } from './notificationReducer';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
  NotificationTypeFilters,
} from '../actions/notificationActionTypes';

const author = (id, first, last) => ({
  id,
  name: { first, last },
  email: `${first.toLowerCase()}@example.com`,
  picture: 'http://placehold.it/32x32',
  age: 25,
});

const data = [
  {
    id: 'n1',
    author: author('u1', 'Poole', 'Sanders'),
    context: {
      guid: 'g1', isRead: false, type: 'default', value: 'New course available',
    },
  },
  {
    id: 'n2',
    author: author('u2', 'Norton', 'Grimes'),
    context: {
      guid: 'g2', isRead: true, type: 'urgent', value: 'New resume available',
    },
  },
];

const fetched = {
  filter: 'DEFAULT',
  loading: false,
  notifications: {
    users: {
      u1: author('u1', 'Poole', 'Sanders'),
      u2: author('u2', 'Norton', 'Grimes'),
    },
    messages: {
      g1: {
        guid: 'g1', isRead: false, type: 'default', value: 'New course available',
      },
      g2: {
        guid: 'g2', isRead: true, type: 'urgent', value: 'New resume available',
      },
    },
    notifications: {
      n1: { id: 'n1', author: 'u1', context: 'g1' },
      n2: { id: 'n2', author: 'u2', context: 'g2' },
    },
  },
};

describe('notificationReducer', () => {
  it('returns the default state with the DEFAULT filter, loading false and no notifications', () => {
    const state = notificationReducer(undefined, {});
    expect(Map.isMap(state)).toBe(true);
    expect(state.toJS()).toEqual({
      filter: 'DEFAULT',
      loading: false,
      notifications: {},
    });
    expect(notificationReducer().toJS()).toEqual(state.toJS());
  });

  it('normalizes and deeply merges the data passed with FETCH_NOTIFICATIONS_SUCCESS', () => {
    const state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    expect(state.toJS()).toEqual(fetched);
  });

  it('keeps the notifications already in the state when fetching again', () => {
    const first = notificationReducer(undefined, {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [data[0]],
    });
    const second = notificationReducer(first, {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [data[1]],
    });
    expect(second.toJS()).toEqual(fetched);
  });

  it('updates the right message with MARK_AS_READ', () => {
    const state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    const next = notificationReducer(state, { type: MARK_AS_READ, index: 'g1' });
    expect(next.getIn(['notifications', 'messages', 'g1', 'isRead'])).toBe(true);
    expect(next.getIn(['notifications', 'messages', 'g2', 'isRead'])).toBe(true);
    expect(state.getIn(['notifications', 'messages', 'g1', 'isRead'])).toBe(false);
  });

  it('updates the filter with SET_TYPE_FILTER', () => {
    const state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    const next = notificationReducer(state, {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });
    expect(next.toJS()).toEqual({ ...fetched, filter: 'URGENT' });
  });

  it('updates the loading attribute with SET_LOADING_STATE', () => {
    const loading = notificationReducer(undefined, { type: SET_LOADING_STATE, loading: true });
    expect(loading.get('loading')).toBe(true);
    const done = notificationReducer(loading, { type: SET_LOADING_STATE, loading: false });
    expect(done.get('loading')).toBe(false);
  });
});
