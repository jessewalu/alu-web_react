import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

const listNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
];

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

  it('renders one NotificationItem per notification', () => {
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={listNotifications} />,
    );
    expect(wrapper.find(NotificationItem)).toHaveLength(2);
    expect(wrapper.find(NotificationItem).first().props()).toMatchObject({
      id: 1,
      type: 'default',
      value: 'New course available',
    });
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
});
