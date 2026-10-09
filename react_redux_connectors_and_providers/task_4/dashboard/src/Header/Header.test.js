import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { Header, mapStateToProps } from './Header';

const user = { email: 'jesse@example.com', password: 'secret' };

describe('<Header />', () => {
  it('renders without crashing', () => {
    expect(shallow(<Header />).exists()).toBe(true);
  });

  it('renders the logo and the h1 title', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toBe('School dashboard');
  });

  it('does not render the logout section when the user is logged out', () => {
    const wrapper = shallow(<Header user={user} isLoggedIn={false} />);
    expect(wrapper.find('#logoutSection')).toHaveLength(0);
  });

  it('does not render the logout section without a user', () => {
    const wrapper = shallow(<Header user={null} isLoggedIn />);
    expect(wrapper.find('#logoutSection')).toHaveLength(0);
  });

  it('renders the logout section with the email when the user is logged in', () => {
    const wrapper = shallow(<Header user={user} isLoggedIn />);
    expect(wrapper.find('#logoutSection')).toHaveLength(1);
    expect(wrapper.find('#logoutSection').text()).toContain('jesse@example.com');
  });
});

describe('Header connectors', () => {
  it('mapStateToProps maps the user from the uiReducer state', () => {
    const state = { ui: Map({ isUserLoggedIn: true, user }) };
    expect(mapStateToProps(state)).toEqual({ user, isLoggedIn: true });
  });
});
