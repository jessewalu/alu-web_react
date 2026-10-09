import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  default: {
    color: 'blue',
  },
  urgent: {
    color: 'red',
  },
});

class NotificationItem extends PureComponent {
  render() {
    const {
      type, value, html, markAsRead, id,
    } = this.props;
    const className = css(type === 'urgent' ? styles.urgent : styles.default);
    const handleClick = () => markAsRead(id);

    if (html) {
      return (
        <li
          className={className}
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          onClick={handleClick}
        />
      );
    }

    return (
      <li className={className} data-notification-type={type} onClick={handleClick}>
        {value}
      </li>
    );
  }
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

NotificationItem.defaultProps = {
  type: 'default',
  value: '',
  html: null,
  markAsRead: () => {},
  id: 0,
};

export default NotificationItem;
