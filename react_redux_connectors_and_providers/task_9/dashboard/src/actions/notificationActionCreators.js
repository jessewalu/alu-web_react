import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_LOADING_STATE,
} from './notificationActionTypes';

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

export const setLoadingState = (loading) => ({
  type: SET_LOADING_STATE,
  loading,
});

export const setNotifications = (data) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  data,
});

export const fetchNotifications = () => (dispatch) => {
  dispatch(setLoadingState(true));

  return fetch('/notifications.json')
    .then((response) => response.json())
    .then((data) => dispatch(setNotifications(data)))
    // A failed request leaves the notifications untouched; the loading state is reset below.
    .catch(() => {})
    .then(() => dispatch(setLoadingState(false)));
};
