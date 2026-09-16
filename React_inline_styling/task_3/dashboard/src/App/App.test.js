import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';

import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});


describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('renders a Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Footer).length).toBe(1);
  });

  it('renders a Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications).length).toBe(1);
  });

  it('renders the (logged) Login component when the user is not logged in', () => {
    const wrapper = shallow(<App />);
    const wrapped = wrapper.find(BodySectionWithMarginBottom).filterWhere(
      (n) => n.prop('title') === 'Log in to continue'
    );
    expect(wrapped.length).toBe(1);
    const loginNode = wrapped.props().children;
    expect(loginNode.type.displayName).toBe('WithLogging(Login)');
  });

  it('logs mount/unmount messages for Login through the WithLogging HOC', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const wrapper = mount(<App />);

    expect(consoleSpy).toHaveBeenCalledWith('Component Login is mounted');

    wrapper.unmount();

    expect(consoleSpy).toHaveBeenCalledWith('Component Login is going to unmount');
    consoleSpy.mockRestore();
  });

  it('wraps CourseList in a BodySectionWithMarginBottom titled "Course list" once logged in', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().logIn();
    wrapper.update();
    const wrapped = wrapper.find(BodySectionWithMarginBottom).filterWhere(
      (n) => n.prop('title') === 'Course list'
    );
    expect(wrapped.length).toBe(1);
  });

  it('renders a BodySection titled "News from the School" with a paragraph', () => {
    const wrapper = shallow(<App />);
    const news = wrapper.find(BodySection).filterWhere(
      (n) => n.prop('title') === 'News from the School'
    );
    expect(news.length).toBe(1);
    expect(news.find('p').length).toBe(1);
  });
});

describe('<App /> keydown logOut', () => {
  let alertSpy;
  let consoleSpy;

  beforeEach(() => {
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    alertSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it('calls logOut and alerts "Logging you out" when ctrl+h is pressed', () => {
    const logOut = jest.fn();
    const wrapper = mount(<App logOut={logOut} />);

    const event = new KeyboardEvent('keydown', {
      key: 'h',
      ctrlKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
    expect(logOut).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('does not call logOut when h is pressed without ctrl', () => {
    const logOut = jest.fn();
    const wrapper = mount(<App logOut={logOut} />);

    const event = new KeyboardEvent('keydown', {
      key: 'h',
      ctrlKey: false,
      bubbles: true,
    });
    document.dispatchEvent(event);

    expect(alertSpy).not.toHaveBeenCalled();
    expect(logOut).not.toHaveBeenCalled();

    wrapper.unmount();
  });
});
