import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import { NotificationItemShape } from '../utils/utils';

const opacityKeyframes = {
  from: {
    opacity: 0.5,
  },

  to: {
    opacity: 1,
  },
};

const bounceKeyframes = {
  '0%': {
    transform: 'translateY(0px)',
  },

  '50%': {
    transform: 'translateY(-5px)',
  },

  '100%': {
    transform: 'translateY(5px)',
  },
};

const styles = StyleSheet.create({
  notifications: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '260px',
    padding: '10px 15px',
    border: '1px solid #e01d47',
    backgroundColor: '#fff',

    '@media (max-width: 900px)': {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      width: '100%',
      height: '100vh',
      padding: '0',
      border: 'none',
      fontSize: '20px',
      zIndex: 10,
    },
  },

  closeButton: {
    float: 'right',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },

  menuItem: {
    position: 'fixed',
    top: '0',
    right: '0',
    zIndex: 100,
    textAlign: 'right',
    padding: '8px 20px',
    cursor: 'pointer',
    color: '#153354',
    fontWeight: 'bold',
    backgroundColor: '#fff8f8',

    ':hover': {
      animationName: [opacityKeyframes, bounceKeyframes],
      animationDuration: '1s, 0.5s',
      animationIterationCount: 3,
    },
  },

  menuItemHidden: {
    display: 'none',
  },

  list: {
    listStyle: 'none',
    padding: '0',
    margin: '0',

    '@media (max-width: 900px)': {
      padding: '0',
      margin: '0',
      fontSize: '20px',
    },
  },
});

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.listNotifications.length > this.props.listNotifications.length;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer } = this.props;

    return (
      <React.Fragment>
        <div
          className={css(styles.menuItem, displayDrawer && styles.menuItemHidden)}
          onClick={handleDisplayDrawer}
        >
          Your notifications
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <button
              className={css(styles.closeButton)}
              aria-label="Close"
              onClick={handleHideDrawer}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {listNotifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <ul className={css(styles.list)}>
                {listNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={this.markAsRead}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

export default Notifications;
