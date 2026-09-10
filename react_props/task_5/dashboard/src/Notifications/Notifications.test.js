import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

const sampleNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent</strong>' } },
];

describe('Notifications', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the text "Here is the list of notifications" when a list is passed', () => {
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={sampleNotifications} />
    );
    expect(wrapper.find('.Notifications p').first().text()).toBe(
      'Here is the list of notifications'
    );
  });

  describe('when displayDrawer is false', () => {
    it('displays the menu item', () => {
      const wrapper = shallow(<Notifications displayDrawer={false} />);
      expect(wrapper.find('.menuItem').length).toBe(1);
    });

    it('does not display div.Notifications', () => {
      const wrapper = shallow(<Notifications displayDrawer={false} />);
      expect(wrapper.find('.Notifications').length).toBe(0);
    });
  });

  describe('when displayDrawer is true', () => {
    it('displays the menu item', () => {
      const wrapper = shallow(<Notifications displayDrawer />);
      expect(wrapper.find('.menuItem').length).toBe(1);
    });

    it('displays div.Notifications', () => {
      const wrapper = shallow(<Notifications displayDrawer />);
      expect(wrapper.find('.Notifications').length).toBe(1);
    });
  });

  describe('with an empty (or missing) listNotifications', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Notifications displayDrawer />);
    });

    it('renders correctly without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('renders no NotificationItem elements', () => {
      expect(wrapper.find(NotificationItem).length).toBe(0);
    });

    it('displays "No new notification for now" and not the list header text', () => {
      expect(wrapper.find('.Notifications').text()).toContain(
        'No new notification for now'
      );
      expect(wrapper.find('.Notifications').text()).not.toContain(
        'Here is the list of notifications'
      );
    });
  });

  describe('with a populated listNotifications', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Notifications displayDrawer listNotifications={sampleNotifications} />
      );
    });

    it('renders correctly without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('renders the right number of NotificationItem elements', () => {
      expect(wrapper.find(NotificationItem).length).toBe(3);
    });

    it('renders the first NotificationItem with the right value', () => {
      expect(wrapper.find(NotificationItem).first().prop('value')).toBe(
        'New course available'
      );
    });
  });
});
