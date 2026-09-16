import PropTypes from 'prop-types';

export const user = {
  email: '',
  password: '',
  isLoggedIn: false,
};

export const CourseShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  credit: PropTypes.number.isRequired,
});

export const NotificationItemShape = PropTypes.shape({
  id: PropTypes.number,
  type: PropTypes.oneOf(['default', 'urgent']),
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
});

export function getLatestNotification() {
  return '<strong>Urgent requirement</strong> - complete by EOD';
}

export default {
  user,
  CourseShape,
  NotificationItemShape,
  getLatestNotification,
};
