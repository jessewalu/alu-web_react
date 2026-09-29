import React from 'react';
import { mount } from 'enzyme';
import Footer from './Footer';
import { AppContext } from '../App/AppContext';
import { getFullYear, getFooterCopy } from '../utils/utils';

describe('<Footer />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });

  it('renders the copyright text', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.text()).toContain(`Copyright ${getFullYear()} - ${getFooterCopy(true)}`);
    wrapper.unmount();
  });

  it('does not render the contact link when logged out', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.find('a')).toHaveLength(0);
    wrapper.unmount();
  });

  it('renders the contact link when logged in', () => {
    const user = { email: 'jesse@example.com', password: 'secret', isLoggedIn: true };
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut: () => {} }}>
        <Footer />
      </AppContext.Provider>,
    );
    expect(wrapper.find('a').text()).toBe('Contact us');
    wrapper.unmount();
  });
});
