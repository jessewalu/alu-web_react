import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import NotificationItem from './NotificationItem';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('<NotificationItem />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotificationItem value="test" />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the value passed as prop', () => {
    const wrapper = shallow(<NotificationItem value="New course available" />);
    expect(wrapper.text()).toBe('New course available');
  });

  it('renders html when html prop is passed', () => {
    const wrapper = shallow(
      <NotificationItem html={{ __html: '<u>test</u>' }} />
    );
    expect(wrapper.html()).toContain('<u>test</u>');
  });

  it('calls markAsRead with the notification id when clicked', () => {
    const markAsRead = jest.fn();
    const wrapper = shallow(
      <NotificationItem id={42} value="test" markAsRead={markAsRead} />
    );
    wrapper.simulate('click');
    expect(markAsRead).toHaveBeenCalledWith(42);
  });

  it('applies a class to the li element', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    expect(wrapper.find('li').prop('className')).toBeTruthy();
  });

  it('applies a different class for urgent than for default notifications', () => {
    const urgent = shallow(<NotificationItem type="urgent" value="test" />);
    const normal = shallow(<NotificationItem type="default" value="test" />);
    expect(urgent.find('li').prop('className')).not.toBe(
      normal.find('li').prop('className')
    );
  });

  it('keeps the data-notification-type attribute in sync with the type prop', () => {
    const wrapper = shallow(<NotificationItem type="urgent" value="test" />);
    expect(wrapper.find('li').prop('data-notification-type')).toBe('urgent');
  });
});
