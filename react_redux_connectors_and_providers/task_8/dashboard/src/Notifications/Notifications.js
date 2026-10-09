import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';
import {
  fetchNotifications,
  markAsAread,
  setNotificationFilter,
} from '../actions/notificationActionCreators';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';

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
    maxHeight: '60vh',
    overflowY: 'auto',
    backgroundColor: '#fff',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  closeButton: {
    float: 'right',
    cursor: 'pointer',
  },
});

export class Notifications extends PureComponent {
  componentDidMount() {
    const { fetchNotifications: fetchAll } = this.props;
    fetchAll();
  }

  render() {
    const {
      displayDrawer,
      listNotifications,
      handleDisplayDrawer,
      handleHideDrawer,
      markNotificationAsRead,
      setNotificationFilter: setFilter,
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
            <p>Here is the list of notifications</p>
            <button
              type="button"
              id="buttonFilterUrgent"
              aria-label="Show urgent notifications"
              onClick={() => setFilter(NotificationTypeFilters.URGENT)}
            >
              ‼️
            </button>
            <button
              type="button"
              id="buttonFilterDefault"
              aria-label="Show all notifications"
              onClick={() => setFilter(NotificationTypeFilters.DEFAULT)}
            >
              💠
            </button>
            {listNotifications.size === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <ul className={css(styles.list)}>
                {listNotifications.valueSeq().map((notification) => (
                  <NotificationItem
                    key={notification.get('guid')}
                    id={notification.get('guid')}
                    type={notification.get('type')}
                    value={notification.get('value')}
                    markAsRead={markNotificationAsRead}
                  />
                )).toArray()}
              </ul>
            )}
          </div>
        )}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.instanceOf(Map),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
  setNotificationFilter: PropTypes.func,
  fetchNotifications: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: Map(),
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
  setNotificationFilter: () => {},
  fetchNotifications: () => {},
};

export const mapStateToProps = (state) => ({
  listNotifications: getUnreadNotificationsByType(state.notifications),
});

export const mapDispatchToProps = {
  fetchNotifications,
  markNotificationAsRead: markAsAread,
  setNotificationFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
