import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import App from './App';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import Notifications from '../Notifications/Notifications';

describe('App', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders Login when the state user is logged out', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Login).length).toBe(1);
    expect(wrapper.find(CourseList).length).toBe(0);
  });

  it('renders CourseList when the state user is logged in', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ user: { email: 'a@b.com', password: 'pwd', isLoggedIn: true } });
    expect(wrapper.find(CourseList).length).toBe(1);
    expect(wrapper.find(Login).length).toBe(0);
  });

  it('has a default state for displayDrawer set to false', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('displayDrawer')).toBe(false);
  });

  it('sets displayDrawer to true when handleDisplayDrawer is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.state('displayDrawer')).toBe(true);
  });

  it('sets displayDrawer to false when handleHideDrawer is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().handleDisplayDrawer();
    wrapper.instance().handleHideDrawer();
    expect(wrapper.state('displayDrawer')).toBe(false);
  });

  it('passes displayDrawer and the drawer handlers down to Notifications', () => {
    const wrapper = shallow(<App />);
    const notifications = wrapper.find(Notifications);
    expect(notifications.prop('displayDrawer')).toBe(false);
    expect(typeof notifications.prop('handleDisplayDrawer')).toBe('function');
    expect(typeof notifications.prop('handleHideDrawer')).toBe('function');
  });

  it('updates the state user when logIn is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().logIn('a@b.com', 'pwd');
    expect(wrapper.state('user')).toEqual({
      email: 'a@b.com',
      password: 'pwd',
      isLoggedIn: true,
    });
  });

  it('resets the state user when logOut is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().logIn('a@b.com', 'pwd');
    wrapper.instance().logOut();
    expect(wrapper.state('user')).toEqual({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  });

  it('has a default listNotifications state matching the mock data', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('listNotifications').length).toBe(3);
  });

  it('removes the notification with the given id when markNotificationAsRead is called', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({
      listNotifications: [
        { id: 1, type: 'default', value: 'One' },
        { id: 2, type: 'default', value: 'Two' },
        { id: 3, type: 'default', value: 'Three' },
      ],
    });
    wrapper.instance().markNotificationAsRead(2);
    expect(wrapper.state('listNotifications')).toEqual([
      { id: 1, type: 'default', value: 'One' },
      { id: 3, type: 'default', value: 'Three' },
    ]);
  });
});
