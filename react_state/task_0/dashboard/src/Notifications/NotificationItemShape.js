import PropTypes from 'prop-types';

const NotificationItemShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['default', 'urgent']),
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
});

export default NotificationItemShape;
