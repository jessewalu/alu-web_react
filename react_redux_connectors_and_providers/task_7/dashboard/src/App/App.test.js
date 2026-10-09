import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import {
  displayNotificationDrawer,
  hideNotificationDrawer,
} from '../actions/uiActionCreators';

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

  it('passes displayDrawer and the drawer handlers from the props to Notifications', () => {
    const displayNotificationDrawer = jest.fn();
    const hideNotificationDrawer = jest.fn();
    const wrapper = shallow(
      <App
        displayDrawer
        displayNotificationDrawer={displayNotificationDrawer}
        hideNotificationDrawer={hideNotificationDrawer}
      />,
    );
    const notifications = wrapper.find(Notifications);

    expect(notifications.prop('displayDrawer')).toBe(true);
    notifications.prop('handleDisplayDrawer')();
    notifications.prop('handleHideDrawer')();
    expect(displayNotificationDrawer).toHaveBeenCalledTimes(1);
    expect(hideNotificationDrawer).toHaveBeenCalledTimes(1);
  });

  it('does not display the drawer by default', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications).prop('displayDrawer')).toBe(false);
  });

  it('returns false values when the user is logged out and the drawer is hidden', () => {
    const state = {
      ui: fromJS({
        isUserLoggedIn: false,
        isNotificationDrawerVisible: false,
      }),
    };

    expect(mapStateToProps(state)).toEqual({
      isLoggedIn: false,
      displayDrawer: false,
    });
  });
});

describe('mapDispatchToProps', () => {
  it('maps the drawer action creators', () => {
    expect(mapDispatchToProps).toMatchObject({
      displayNotificationDrawer,
      hideNotificationDrawer,
    });
  });
});
