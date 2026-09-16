import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ type, value, html, markAsRead, id }) {
  return (
    <li
      data-notification-type={type}
      onClick={() => markAsRead(id)}
      dangerouslySetInnerHTML={html ? { __html: html.__html } : undefined}
    >
      {!html ? value : null}
    </li>
  );
}

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.oneOf(['default', 'urgent']),
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  id: 0,
  type: 'default',
  value: '',
  html: undefined,
  markAsRead: () => {},
};

export default React.memo(NotificationItem);
