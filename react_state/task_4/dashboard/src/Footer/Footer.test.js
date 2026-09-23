import React from 'react';
import { mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Footer from './Footer';
import { AppContext, user as defaultUser, logOut as defaultLogOut } from '../App/AppContext';

describe('Footer', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: defaultLogOut }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a paragraph with copyright text', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: defaultLogOut }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('p').length).toBeGreaterThanOrEqual(1);
  });

  it('does not render the Contact us link when the user is logged out', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: defaultLogOut }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('a').length).toBe(0);
  });

  it('renders the Contact us link when the user is logged in', () => {
    const loggedInUser = { email: 'test@example.com', password: 'pwd', isLoggedIn: true };
    const wrapper = mount(
      <AppContext.Provider value={{ user: loggedInUser, logOut: defaultLogOut }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('a').text()).toBe('Contact us');
  });
});
