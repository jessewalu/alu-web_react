import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';

export const filterTypeSelected = (state) => state.get('filter');

export const getNotifications = (state) => state.getIn(['notifications', 'messages'], Map());

// Memoized: only recomputed when the filter or the list of notifications changes.
export const getUnreadNotificationsByType = createSelector(
  [filterTypeSelected, getNotifications],
  (filter, notifications) => {
    const unread = notifications.filter((notification) => !notification.get('isRead'));

    if (filter === NotificationTypeFilters.URGENT) {
      return unread.filter((notification) => notification.get('type') === 'urgent');
    }

    return unread;
  },
);
