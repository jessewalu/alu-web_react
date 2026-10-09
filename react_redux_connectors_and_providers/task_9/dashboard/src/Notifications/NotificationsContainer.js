import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notifications from './Notifications';
import {
  fetchNotifications,
  markAsAread,
  setNotificationFilter,
} from '../actions/notificationActionCreators';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';

export class NotificationsContainer extends Component {
  componentDidMount() {
    const { fetchNotifications: fetchAll } = this.props;
    fetchAll();
  }

  render() {
    return <Notifications {...this.props} />;
  }
}

NotificationsContainer.propTypes = {
  fetchNotifications: PropTypes.func,
};

NotificationsContainer.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
