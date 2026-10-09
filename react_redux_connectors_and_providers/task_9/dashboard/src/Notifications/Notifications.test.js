import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Notifications } from './Notifications';
import NotificationItem from './NotificationItem';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';

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
    expect(wrapper.find('p').last().text()).toBe('No new notification for now');
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
    opened.find('button[aria-label="Close"]').simulate('click');
    expect(handleHideDrawer).toHaveBeenCalledTimes(1);
  });

  it('renders the title and the two filter buttons under it', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    expect(wrapper.find('p').first().text()).toBe('Here is the list of notifications');
    expect(wrapper.find('#buttonFilterUrgent').text()).toBe('‼️');
    expect(wrapper.find('#buttonFilterDefault').text()).toBe('💠');
  });

  it('calls setNotificationFilter with URGENT when the first button is clicked', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <Notifications displayDrawer setNotificationFilter={setFilter} />,
    );
    wrapper.find('#buttonFilterUrgent').simulate('click');
    expect(setFilter).toHaveBeenCalledTimes(1);
    expect(setFilter).toHaveBeenCalledWith(NotificationTypeFilters.URGENT);
  });

  it('calls setNotificationFilter with DEFAULT when the second button is clicked', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <Notifications displayDrawer setNotificationFilter={setFilter} />,
    );
    wrapper.find('#buttonFilterDefault').simulate('click');
    expect(setFilter).toHaveBeenCalledTimes(1);
    expect(setFilter).toHaveBeenCalledWith(NotificationTypeFilters.DEFAULT);
  });

  it('keeps the filter buttons when the filtered list is empty', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    expect(wrapper.find('#buttonFilterUrgent')).toHaveLength(1);
    expect(wrapper.find('#buttonFilterDefault')).toHaveLength(1);
  });
});
