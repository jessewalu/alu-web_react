import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotificationItem />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct html when passing type and value', () => {
    const wrapper = shallow(
      <NotificationItem type="default" value="test" />
    );
    expect(wrapper.find('li').prop('data-notification-type')).toBe('default');
    expect(wrapper.text()).toBe('test');
  });

  it('renders the correct html when passing the html prop', () => {
    const wrapper = shallow(
      <NotificationItem type="default" html={{ __html: '<u>test</u>' }} />
    );
    expect(wrapper.find('li').html()).toBe(
      '<li data-notification-type="default"><u>test</u></li>'
    );
  });
});
