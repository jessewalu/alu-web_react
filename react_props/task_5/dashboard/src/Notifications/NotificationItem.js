import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ type, html, value }) {
  if (html) {
    return (
      // eslint-disable-next-line react/no-danger
      <li data-notification-type={type} dangerouslySetInnerHTML={html} />
    );
  }

  return <li data-notification-type={type}>{value}</li>;
}

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  value: PropTypes.string,
};

NotificationItem.defaultProps = {
  type: 'default',
  html: undefined,
  value: undefined,
};

export default NotificationItem;
