import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('Notifications', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the menu item', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('div').first().text()).toBe('Your notifications');
  });

  it('does not render the drawer when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('ul').length).toBe(0);
  });

  it('renders "No new notification for now" when the list is empty and drawer is open', () => {
    const wrapper = shallow(<Notifications displayDrawer listNotifications={[]} />);
    expect(wrapper.text()).toContain('No new notification for now');
  });

  it('renders a NotificationItem per notification when drawer is open', () => {
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={listNotifications} />
    );
    expect(wrapper.find(NotificationItem).length).toBe(2);
  });

  it('calls handleDisplayDrawer when the menu item is clicked', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications displayDrawer={false} handleDisplayDrawer={handleDisplayDrawer} />
    );
    wrapper.find('div').first().simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  it('calls handleHideDrawer when the close button is clicked', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications displayDrawer handleHideDrawer={handleHideDrawer} />
    );
    wrapper.find('button').simulate('click');
    expect(handleHideDrawer).toHaveBeenCalled();
  });

  it('passes markNotificationAsRead down to each NotificationItem as markAsRead', () => {
    const markNotificationAsRead = jest.fn();
    const listNotifications = [{ id: 1, type: 'default', value: 'New course available' }];
    const wrapper = shallow(
      <Notifications
        displayDrawer
        listNotifications={listNotifications}
        markNotificationAsRead={markNotificationAsRead}
      />
    );
    expect(wrapper.find(NotificationItem).at(0).prop('markAsRead')).toBe(markNotificationAsRead);
  });
});
