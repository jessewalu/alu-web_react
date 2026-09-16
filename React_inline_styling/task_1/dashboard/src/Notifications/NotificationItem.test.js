import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

import { StyleSheetTestUtils } from 'aphrodite';

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
});
