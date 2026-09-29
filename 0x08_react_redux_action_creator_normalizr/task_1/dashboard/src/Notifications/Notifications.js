import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';

const styles = StyleSheet.create({
  menuItem: {
    textAlign: 'right',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
  },
  notifications: {
    border: '2px dashed #e0354b',
    padding: '0.5rem 1rem',
    margin: '0.5rem',
  },
  closeButton: {
    float: 'right',
    cursor: 'pointer',
  },
});

class Notifications extends PureComponent {
  render() {
    const {
      displayDrawer,
      listNotifications,
      handleDisplayDrawer,
      handleHideDrawer,
      markNotificationAsRead,
    } = this.props;

    return (
      <>
        {!displayDrawer && (
          <div
            id="menuItem"
            className={css(styles.menuItem)}
            onClick={handleDisplayDrawer}
          >
            Your notifications
          </div>
        )}
        {displayDrawer && (
          <div id="Notifications" className={css(styles.notifications)}>
            <button
              type="button"
              aria-label="Close"
              className={css(styles.closeButton)}
              onClick={handleHideDrawer}
            >
              x
            </button>
            {listNotifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul>
                  {listNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={markNotificationAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    }),
  ),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

export default Notifications;
