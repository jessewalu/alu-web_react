import React from 'react';
import { mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Header from './Header';
import { AppContext, user as defaultUser, logOut as defaultLogOut } from '../App/AppContext';

describe('Header', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: defaultLogOut }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders an img and an h1', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: defaultLogOut }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('h1').length).toBe(1);
  });

  it('does not render the logoutSection with the default context value', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: defaultLogOut }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').length).toBe(0);
  });

  it('renders the logoutSection when the context user is logged in', () => {
    const loggedInUser = { email: 'test@example.com', password: 'pwd', isLoggedIn: true };
    const wrapper = mount(
      <AppContext.Provider value={{ user: loggedInUser, logOut: defaultLogOut }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').length).toBe(1);
    expect(wrapper.find('#logoutSection').text()).toContain('test@example.com');
  });

  it('calls logOut when the logout link is clicked', () => {
    const loggedInUser = { email: 'test@example.com', password: 'pwd', isLoggedIn: true };
    const logOutSpy = jest.fn();
    const wrapper = mount(
      <AppContext.Provider value={{ user: loggedInUser, logOut: logOutSpy }}>
        <Header />
      </AppContext.Provider>
    );
    wrapper.find('#logoutSection a').simulate('click');
    expect(logOutSpy).toHaveBeenCalled();
  });
});
