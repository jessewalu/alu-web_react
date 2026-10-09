import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { App, mapStateToProps } from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';

describe('<App />', () => {
  it('renders without crashing', () => {
    expect(shallow(<App />).exists()).toBe(true);
  });

  it('contains Notifications, Header, Login and Footer when logged out', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Login)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(CourseList)).toHaveLength(0);
  });

  it('shows the CourseList instead of the Login form when isLoggedIn is true', () => {
    const wrapper = shallow(<App isLoggedIn />);
    expect(wrapper.find(CourseList)).toHaveLength(1);
    expect(wrapper.find(Login)).toHaveLength(0);
  });

  it('displays and hides the notification drawer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('displayDrawer')).toBe(false);

    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.state('displayDrawer')).toBe(true);

    wrapper.instance().handleHideDrawer();
    expect(wrapper.state('displayDrawer')).toBe(false);
  });

  it('logs the user in and out', () => {
    const wrapper = shallow(<App />);

    wrapper.instance().logIn('jesse@example.com', 'secret');
    expect(wrapper.state('user')).toEqual({
      email: 'jesse@example.com',
      password: 'secret',
      isLoggedIn: true,
    });

    wrapper.instance().logOut();
    expect(wrapper.state('user').isLoggedIn).toBe(false);
  });

  it('removes a notification when it is marked as read', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('listNotifications')).toHaveLength(3);

    wrapper.instance().markNotificationAsRead(2);
    const ids = wrapper.state('listNotifications').map((notification) => notification.id);
    expect(ids).toEqual([1, 3]);
  });
});

describe('mapStateToProps', () => {
  it('returns the right object from the uiReducer state', () => {
    const state = fromJS({
      isUserLoggedIn: true,
    });

    expect(mapStateToProps(state)).toEqual({ isLoggedIn: true });
  });

  it('returns isLoggedIn false when the user is logged out', () => {
    const state = fromJS({
      isUserLoggedIn: false,
    });

    expect(mapStateToProps(state)).toEqual({ isLoggedIn: false });
  });
});
