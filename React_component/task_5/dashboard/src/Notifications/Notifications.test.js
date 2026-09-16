import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('<Notifications /> markAsRead', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('logs the correct message when markAsRead is called', () => {
    const wrapper = shallow(<Notifications />);
    wrapper.instance().markAsRead(5);
    expect(consoleSpy).toHaveBeenCalledWith('Notification 5 has been marked as read');
  });
});

describe('<Notifications />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the menuItem when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('.menuItem').length).toBe(1);
    expect(wrapper.find('.Notifications').length).toBe(0);
  });

  it('renders the drawer with the empty message when displayDrawer is true and there are no notifications', () => {
    const wrapper = shallow(<Notifications displayDrawer listNotifications={[]} />);
    expect(wrapper.find('.Notifications').length).toBe(1);
    expect(wrapper.find('p').text()).toBe('No new notification for now');
  });

  it('renders a NotificationItem per notification when displayDrawer is true', () => {
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={listNotifications} />
    );
    expect(wrapper.find(NotificationItem).length).toBe(2);
  });
});

describe('<Notifications /> shouldComponentUpdate', () => {
  const listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
  ];

  const longerListNotifications = [
    ...listNotifications,
    { id: 3, type: 'default', value: 'New data available' },
  ];

  it('does not rerender when updated with the same length list', () => {
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={listNotifications} />
    );
    const renderSpy = jest.spyOn(Notifications.prototype, 'render');

    wrapper.setProps({ listNotifications });

    expect(renderSpy).not.toHaveBeenCalled();
    renderSpy.mockRestore();
  });

  it('rerenders when updated with a longer list', () => {
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={listNotifications} />
    );
    const renderSpy = jest.spyOn(Notifications.prototype, 'render');

    wrapper.setProps({ listNotifications: longerListNotifications });

    expect(renderSpy).toHaveBeenCalled();
    renderSpy.mockRestore();
  });
});
