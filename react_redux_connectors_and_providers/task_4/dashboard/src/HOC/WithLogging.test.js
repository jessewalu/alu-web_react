import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';

describe('WithLogging', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('wraps a pure html element and logs on mount and unmount', () => {
    const Wrapped = WithLogging(() => <p />);
    const wrapper = mount(<Wrapped />);
    expect(logSpy).toHaveBeenCalledWith('Component Component is mounted');

    wrapper.unmount();
    expect(logSpy).toHaveBeenCalledWith('Component Component is going to unmount');
  });

  it('uses the name of the wrapped component', () => {
    const Login = () => <div />;
    const Wrapped = WithLogging(Login);
    const wrapper = mount(<Wrapped />);
    expect(logSpy).toHaveBeenCalledWith('Component Login is mounted');
    wrapper.unmount();
    expect(Wrapped.displayName).toBe('WithLogging(Login)');
  });
});
