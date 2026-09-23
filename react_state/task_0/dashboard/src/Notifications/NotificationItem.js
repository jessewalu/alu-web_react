import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  default: {
    color: 'blue',
  },
  urgent: {
    color: 'red',
  },
  item: {
    ':hover': {
      cursor: 'pointer',
    },
  },
});

function NotificationItem({ type, value, html, markAsRead, id }) {
  const styleForType = type === 'urgent' ? styles.urgent : styles.default;

  return (
    <li
      data-notification-type={type}
      className={css(styles.item, styleForType)}
      onClick={() => markAsRead(id)}
      {...(html ? { dangerouslySetInnerHTML: html } : {})}
    >
      {!html ? value : null}
    </li>
  );
}

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
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

export default NotificationItem;
