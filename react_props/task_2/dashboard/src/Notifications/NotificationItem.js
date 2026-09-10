import React from 'react';

function NotificationItem({ type, html, value }) {
  if (html) {
    return (
      // eslint-disable-next-line react/no-danger
      <li data-notification-type={type} dangerouslySetInnerHTML={html} />
    );
  }

  return <li data-notification-type={type}>{value}</li>;
}

export default NotificationItem;
