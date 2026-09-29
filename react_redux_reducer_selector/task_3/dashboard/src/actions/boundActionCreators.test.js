import store from '../store/store';
import { boundSelectCourse, boundUnSelectCourse } from './courseActionCreators';
import {
  boundMarkAsAread,
  boundMarkAsARead,
  boundSetNotificationFilter,
} from './notificationActionCreators';
import {
  boundLogin,
  boundLogout,
  boundDisplayNotificationDrawer,
  boundHideNotificationDrawer,
} from './uiActionCreators';
import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from './notificationActionTypes';
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from './uiActionTypes';

describe('bound action creators', () => {
  let listener;
  let unsubscribe;

  beforeEach(() => {
    listener = jest.fn();
    unsubscribe = store.subscribe(listener);
  });

  afterEach(() => {
    unsubscribe();
  });

  it('boundSelectCourse dispatches SELECT_COURSE', () => {
    expect(boundSelectCourse(1)).toEqual({ type: SELECT_COURSE, index: 1 });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('boundUnSelectCourse dispatches UNSELECT_COURSE', () => {
    expect(boundUnSelectCourse(1)).toEqual({ type: UNSELECT_COURSE, index: 1 });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('boundMarkAsAread dispatches MARK_AS_READ', () => {
    expect(boundMarkAsAread(1)).toEqual({ type: MARK_AS_READ, index: 1 });
    expect(boundMarkAsARead).toBe(boundMarkAsAread);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('boundSetNotificationFilter dispatches SET_TYPE_FILTER', () => {
    expect(boundSetNotificationFilter(NotificationTypeFilters.URGENT)).toEqual({
      type: SET_TYPE_FILTER,
      filter: 'URGENT',
    });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('boundLogin dispatches LOGIN', () => {
    expect(boundLogin('jesse@example.com', 'secret')).toEqual({
      type: LOGIN,
      user: { email: 'jesse@example.com', password: 'secret' },
    });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('boundLogout dispatches LOGOUT', () => {
    expect(boundLogout()).toEqual({ type: LOGOUT });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('boundDisplayNotificationDrawer dispatches DISPLAY_NOTIFICATION_DRAWER', () => {
    expect(boundDisplayNotificationDrawer()).toEqual({
      type: DISPLAY_NOTIFICATION_DRAWER,
    });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('boundHideNotificationDrawer dispatches HIDE_NOTIFICATION_DRAWER', () => {
    expect(boundHideNotificationDrawer()).toEqual({
      type: HIDE_NOTIFICATION_DRAWER,
    });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
