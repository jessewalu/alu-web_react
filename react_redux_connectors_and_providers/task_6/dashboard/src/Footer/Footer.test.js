import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { Footer, mapStateToProps } from './Footer';
import { getFullYear, getFooterCopy } from '../utils/utils';

const user = { email: 'jesse@example.com', password: 'secret' };

describe('<Footer />', () => {
  it('renders without crashing', () => {
    expect(shallow(<Footer />).exists()).toBe(true);
  });

  it('renders the copyright text', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.text()).toContain(`Copyright ${getFullYear()} - ${getFooterCopy(true)}`);
  });

  it('does not render the contact link when logged out', () => {
    const wrapper = shallow(<Footer user={user} isLoggedIn={false} />);
    expect(wrapper.find('a')).toHaveLength(0);
  });

  it('renders the contact link when the user is logged in', () => {
    const wrapper = shallow(<Footer user={user} isLoggedIn />);
    expect(wrapper.find('a').text()).toBe('Contact us');
  });
});

describe('Footer mapStateToProps', () => {
  it('maps the user from the uiReducer state', () => {
    const state = { ui: Map({ isUserLoggedIn: true, user }) };
    expect(mapStateToProps(state)).toEqual({ user, isLoggedIn: true });
  });
});
