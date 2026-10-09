import { Map } from 'immutable';

export const filterTypeSelected = (state) => state.get('filter');

export const getNotifications = (state) => state.getIn(['notifications', 'messages'], Map());

export const getUnreadNotifications = (state) => (
  getNotifications(state).filter((notification) => !notification.get('isRead'))
);
