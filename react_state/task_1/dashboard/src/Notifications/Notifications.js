import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

const styles = StyleSheet.create({
  menuItem: {
    position: 'fixed',
    top: 10,
    right: 10,
    backgroundColor: '#fff8f8',
    padding: '8px 12px',
    cursor: 'pointer',
  },
  notifications: {
    border: '1px dashed #e0354b',
    padding: '10px 20px',
  },
  noNotifications: {
    fontWeight: 'bold',
  },
});

class Notifications extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.listNotifications.length !== this.props.listNotifications.length) {
      return true;
    }
    if (nextProps.displayDrawer !== this.props.displayDrawer) {
      return true;
    }
    return false;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const {
      listNotifications,
      displayDrawer,
      handleDisplayDrawer,
      handleHideDrawer,
    } = this.props;

    return (
      <React.Fragment>
        <div
          className={css(styles.menuItem)}
          onClick={handleDisplayDrawer}
        >
          Your notifications
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <button
              aria-label="Close"
              type="button"
              style={{ float: 'right' }}
              onClick={handleHideDrawer}
            >
              x
            </button>
            {listNotifications.length === 0 ? (
              <p className={css(styles.noNotifications)}>No new notification for now</p>
            ) : (
              <React.Fragment>
                <p>Here is the list of notifications</p>
                <ul>
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
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
};

Notifications.defaultProps = {
  listNotifications: [],
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

export default Notifications;
