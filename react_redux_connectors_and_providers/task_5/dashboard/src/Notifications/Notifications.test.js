import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, Map } from 'immutable';
import {
  Notifications,
  mapStateToProps,
  mapDispatchToProps,
} from './Notifications';
import NotificationItem from './NotificationItem';
import { fetchNotifications } from '../actions/notificationActionCreators';

const listNotifications = fromJS({
  'guid-1': {
    guid: 'guid-1', isRead: false, type: 'default', value: 'New course available',
  },
  'guid-2': {
    guid: 'guid-2', isRead: false, type: 'urgent', value: 'New resume available',
  },
});

describe('<Notifications />', () => {
  it('renders without crashing', () => {
    expect(shallow(<Notifications />).exists()).toBe(true);
  });

  it('renders the menu item and no drawer when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('#menuItem')).toHaveLength(1);
    expect(wrapper.find('#Notifications')).toHaveLength(0);
  });

  it('renders the drawer and hides the menu item when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    expect(wrapper.find('#menuItem')).toHaveLength(0);
    expect(wrapper.find('#Notifications')).toHaveLength(1);
  });

  it('renders the empty message when there are no notifications', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    expect(wrapper.find(NotificationItem)).toHaveLength(0);
    expect(wrapper.find('p').text()).toBe('No new notification for now');
  });

  it('renders one NotificationItem per notification with the guid as id', () => {
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={listNotifications} />,
    );
    expect(wrapper.find(NotificationItem)).toHaveLength(2);
    expect(wrapper.find(NotificationItem).first().props()).toMatchObject({
      id: 'guid-1',
      type: 'default',
      value: 'New course available',
    });
  });

  it('passes markNotificationAsRead to the items', () => {
    const markNotificationAsRead = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer
        listNotifications={listNotifications}
        markNotificationAsRead={markNotificationAsRead}
      />,
    );
    wrapper.find(NotificationItem).first().prop('markAsRead')('guid-1');
    expect(markNotificationAsRead).toHaveBeenCalledWith('guid-1');
  });

  it('calls handleDisplayDrawer and handleHideDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    const handleHideDrawer = jest.fn();

    const closed = shallow(
      <Notifications handleDisplayDrawer={handleDisplayDrawer} />,
    );
    closed.find('#menuItem').simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);

    const opened = shallow(
      <Notifications displayDrawer handleHideDrawer={handleHideDrawer} />,
    );
    opened.find('button').simulate('click');
    expect(handleHideDrawer).toHaveBeenCalledTimes(1);
  });

  it('calls fetchNotifications when the component is mounted', () => {
    const fetchSpy = jest.fn();
    shallow(<Notifications fetchNotifications={fetchSpy} />);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});

describe('Notifications connectors', () => {
  it('mapStateToProps maps listNotifications to the messages of the notifications state', () => {
    const state = {
      notifications: fromJS({
        filter: 'DEFAULT',
        loading: false,
        notifications: { messages: listNotifications.toJS() },
      }),
    };
    const props = mapStateToProps(state);
    expect(Map.isMap(props.listNotifications)).toBe(true);
    expect(props.listNotifications.toJS()).toEqual(listNotifications.toJS());
  });

  it('mapStateToProps returns an empty Map before the notifications are fetched', () => {
    const state = {
      notifications: fromJS({ filter: 'DEFAULT', loading: false, notifications: {} }),
    };
    expect(mapStateToProps(state).listNotifications.size).toBe(0);
  });

  it('mapDispatchToProps maps fetchNotifications', () => {
    expect(mapDispatchToProps).toEqual({ fetchNotifications });
  });
});
