import { Map } from 'immutable';

export const filterTypeSelected = (state) => state.get('filter');

export const getNotifications = (state) => state.get('notifications', Map());

export const getUnreadNotifications = (state) => (
  getNotifications(state).filter((notification) => !notification.get('isRead'))
);
