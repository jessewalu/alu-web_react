import { bindActionCreators } from 'redux';
import store from '../store/store';
import { MARK_AS_READ, SET_TYPE_FILTER } from './notificationActionTypes';

export const markAsAread = (index) => ({
  type: MARK_AS_READ,
  index,
});

// Alias so the creator can be imported under either spelling (markAsAread / markAsARead).
export const markAsARead = markAsAread;

export const setNotificationFilter = (filter) => ({
  type: SET_TYPE_FILTER,
  filter,
});

export const boundMarkAsAread = bindActionCreators(markAsAread, store.dispatch);

export const boundMarkAsARead = boundMarkAsAread;

export const boundSetNotificationFilter = bindActionCreators(
  setNotificationFilter,
  store.dispatch,
);
