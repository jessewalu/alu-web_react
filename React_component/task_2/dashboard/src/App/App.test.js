import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';

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

  it('renders the Login component when the user is not logged in', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Login).length).toBe(1);
  });
});

describe('<App /> keydown logOut', () => {
  let alertSpy;

  beforeEach(() => {
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    alertSpy.mockRestore();
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
