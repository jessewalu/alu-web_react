import {
  markAsAread,
  markAsARead,
  setNotificationFilter,
} from './notificationActionCreators';
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
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
