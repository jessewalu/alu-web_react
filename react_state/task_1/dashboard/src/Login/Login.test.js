import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Login from './Login';

describe('Login', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a form wrapping two inputs and a submit input', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input[type="email"]').length).toBe(1);
    expect(wrapper.find('input[type="password"]').length).toBe(1);
    expect(wrapper.find('input[type="submit"]').length).toBe(1);
  });

  it('has empty (but not null) email and password in the default state', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.state('email')).toBe('');
    expect(wrapper.state('password')).toBe('');
    expect(wrapper.state('email')).not.toBeNull();
    expect(wrapper.state('password')).not.toBeNull();
  });

  it('has the submit button disabled by default', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.state('enableSubmit')).toBe(false);
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  it('enables the submit button after both inputs are filled', () => {
    const wrapper = shallow(<Login />);
    wrapper.find('input[type="email"]').simulate('change', { target: { value: 'test@test.com' } });
    wrapper.find('input[type="password"]').simulate('change', { target: { value: 'pwd' } });
    expect(wrapper.state('enableSubmit')).toBe(true);
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(false);
  });

  it('updates the email and password state when the inputs change', () => {
    const wrapper = shallow(<Login />);
    wrapper.find('input[type="email"]').simulate('change', { target: { value: 'a@b.com' } });
    expect(wrapper.state('email')).toBe('a@b.com');
    wrapper.find('input[type="password"]').simulate('change', { target: { value: 'secret' } });
    expect(wrapper.state('password')).toBe('secret');
  });
});
