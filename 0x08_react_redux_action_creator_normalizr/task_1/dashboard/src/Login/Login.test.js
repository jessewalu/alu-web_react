import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from './Login';

describe('<Login />', () => {
  it('renders without crashing', () => {
    expect(shallow(<Login />).exists()).toBe(true);
  });

  it('renders 2 labels and 3 inputs', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.find('input')).toHaveLength(3);
    wrapper.unmount();
  });

  it('keeps the submit button disabled until both fields are filled', () => {
    const wrapper = mount(<Login />);
    const submit = () => wrapper.find('input[type="submit"]');

    expect(submit().prop('disabled')).toBe(true);

    wrapper
      .find('input#email')
      .simulate('change', { target: { name: 'email', value: 'jesse@example.com' } });
    expect(submit().prop('disabled')).toBe(true);

    wrapper
      .find('input#password')
      .simulate('change', { target: { name: 'password', value: 'secret' } });
    expect(submit().prop('disabled')).toBe(false);
    wrapper.unmount();
  });

  it('calls logIn with the email and password on submit', () => {
    const logIn = jest.fn();
    const wrapper = mount(<Login logIn={logIn} />);

    wrapper
      .find('input#email')
      .simulate('change', { target: { name: 'email', value: 'jesse@example.com' } });
    wrapper
      .find('input#password')
      .simulate('change', { target: { name: 'password', value: 'secret' } });
    wrapper.find('form').simulate('submit');

    expect(logIn).toHaveBeenCalledWith('jesse@example.com', 'secret');
    wrapper.unmount();
  });
});
