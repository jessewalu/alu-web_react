import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';
import { AppContext } from '../App/AppContext';

describe('<Header />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });

  it('renders the logo and the h1 title', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toBe('School dashboard');
    wrapper.unmount();
  });

  it('does not render the logout section with the default context', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('#logoutSection')).toHaveLength(0);
    wrapper.unmount();
  });

  it('renders the logout section when the user is logged in and calls logOut', () => {
    const logOut = jest.fn();
    const user = { email: 'jesse@example.com', password: 'secret', isLoggedIn: true };
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <Header />
      </AppContext.Provider>,
    );

    expect(wrapper.find('#logoutSection')).toHaveLength(1);
    expect(wrapper.find('#logoutSection').text()).toContain('jesse@example.com');

    wrapper.find('button').simulate('click');
    expect(logOut).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});
