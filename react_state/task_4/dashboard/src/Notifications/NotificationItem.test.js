import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<NotificationItem id={1} type="default" value="test" />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders html when the html prop is passed', () => {
    const wrapper = shallow(
      <NotificationItem id={1} type="urgent" html={{ __html: '<u>test</u>' }} />
    );
    expect(wrapper.html()).toContain('<u>test</u>');
  });

  it('calls markAsRead with the notification id when clicked', () => {
    const markAsRead = jest.fn();
    const wrapper = shallow(
      <NotificationItem id={5} type="default" value="test" markAsRead={markAsRead} />
    );
    wrapper.simulate('click');
    expect(markAsRead).toHaveBeenCalledWith(5);
  });
});
