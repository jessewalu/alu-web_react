import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

describe('<NotificationItem />', () => {
  it('renders without crashing', () => {
    expect(shallow(<NotificationItem />).exists()).toBe(true);
  });

  it('renders the type and value props', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    const li = wrapper.find('li');
    expect(li.text()).toBe('test');
    expect(li.prop('data-notification-type')).toBe('default');
  });

  it('renders the html prop', () => {
    const html = { __html: '<u>test</u>' };
    const wrapper = shallow(<NotificationItem type="urgent" html={html} />);
    expect(wrapper.find('li').prop('dangerouslySetInnerHTML')).toEqual(html);
    expect(wrapper.find('li').prop('data-notification-type')).toBe('urgent');
  });

  it('calls markAsRead with the id when clicked', () => {
    const markAsRead = jest.fn();
    const wrapper = shallow(
      <NotificationItem type="default" value="test" markAsRead={markAsRead} id={7} />,
    );
    wrapper.find('li').simulate('click');
    expect(markAsRead).toHaveBeenCalledWith(7);
  });
});
