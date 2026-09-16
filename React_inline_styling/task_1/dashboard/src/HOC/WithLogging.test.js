import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';
import Login from '../Login/Login';

import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});


describe('WithLogging HOC', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('logs "Component Component is mounted"/"...is going to unmount" for a plain HTML wrapped element', () => {
    const WrappedHTML = WithLogging(() => <p>hello</p>);
    const wrapper = mount(<WrappedHTML />);

    expect(consoleSpy).toHaveBeenCalledWith('Component Component is mounted');

    wrapper.unmount();

    expect(consoleSpy).toHaveBeenCalledWith('Component Component is going to unmount');
  });

  it('logs "Component Login is mounted"/"...is going to unmount" for the Login component', () => {
    const WrappedLogin = WithLogging(Login);
    const wrapper = mount(<WrappedLogin />);

    expect(consoleSpy).toHaveBeenCalledWith('Component Login is mounted');

    wrapper.unmount();

    expect(consoleSpy).toHaveBeenCalledWith('Component Login is going to unmount');
  });

  it('sets the correct displayName', () => {
    const WrappedLogin = WithLogging(Login);
    expect(WrappedLogin.displayName).toBe('WithLogging(Login)');
  });
});
