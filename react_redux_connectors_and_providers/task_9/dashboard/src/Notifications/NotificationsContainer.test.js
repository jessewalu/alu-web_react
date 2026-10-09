import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, Map } from 'immutable';
import {
  NotificationsContainer,
  mapStateToProps,
  mapDispatchToProps,
} from './NotificationsContainer';
import Notifications from './Notifications';
import {
  fetchNotifications,
  markAsAread,
  setNotificationFilter,
} from '../actions/notificationActionCreators';

const messages = {
  'guid-1': {
    guid: 'guid-1', isRead: false, type: 'default', value: 'New course available',
  },
  'guid-2': {
    guid: 'guid-2', isRead: false, type: 'urgent', value: 'New resume available',
  },
  'guid-3': {
    guid: 'guid-3', isRead: true, type: 'urgent', value: 'Already read',
  },
};

describe('<NotificationsContainer />', () => {
  it('renders without crashing', () => {
    expect(shallow(<NotificationsContainer />).exists()).toBe(true);
  });

  it('calls fetchNotifications when the component is mounted', () => {
    const fetchSpy = jest.fn();
    shallow(<NotificationsContainer fetchNotifications={fetchSpy} />);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('renders the Notifications component and passes the props to it', () => {
    const listNotifications = fromJS(messages);
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(
      <NotificationsContainer
        displayDrawer
        listNotifications={listNotifications}
        handleDisplayDrawer={handleDisplayDrawer}
      />,
    );
    const notifications = wrapper.find(Notifications);

    expect(notifications).toHaveLength(1);
    expect(notifications.prop('displayDrawer')).toBe(true);
    expect(notifications.prop('listNotifications')).toBe(listNotifications);
    expect(notifications.prop('handleDisplayDrawer')).toBe(handleDisplayDrawer);
  });
});

describe('NotificationsContainer connectors', () => {
  it('mapStateToProps maps listNotifications to the unread messages for the selected filter', () => {
    const state = {
      notifications: fromJS({
        filter: 'DEFAULT',
        loading: false,
        notifications: { messages },
      }),
    };
    const props = mapStateToProps(state);
    expect(Map.isMap(props.listNotifications)).toBe(true);
    expect(props.listNotifications.keySeq().toArray()).toEqual(['guid-1', 'guid-2']);
  });

  it('mapStateToProps only keeps the unread urgent messages when the filter is URGENT', () => {
    const state = {
      notifications: fromJS({
        filter: 'URGENT',
        loading: false,
        notifications: { messages },
      }),
    };
    expect(mapStateToProps(state).listNotifications.keySeq().toArray()).toEqual(['guid-2']);
  });

  it('mapStateToProps returns an empty Map before the notifications are fetched', () => {
    const state = {
      notifications: fromJS({ filter: 'DEFAULT', loading: false, notifications: {} }),
    };
    expect(mapStateToProps(state).listNotifications.size).toBe(0);
  });

  it('mapDispatchToProps maps fetchNotifications, markNotificationAsRead and setNotificationFilter', () => {
    expect(mapDispatchToProps).toEqual({
      fetchNotifications,
      markNotificationAsRead: markAsAread,
      setNotificationFilter,
    });
  });
});
