import React from 'react';
import { shallow } from 'enzyme';
import BodySection from './BodySection';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('<BodySection />', () => {
  it('renders the title and the children', () => {
    const wrapper = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>,
    );
    expect(wrapper.find('h2').text()).toBe('test title');
    expect(wrapper.find('p').text()).toBe('test children node');
  });
});

describe('<BodySectionWithMarginBottom />', () => {
  it('renders a BodySection with the props passed through', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>,
    );
    const section = wrapper.find(BodySection);
    expect(section).toHaveLength(1);
    expect(section.prop('title')).toBe('test title');
    expect(section.children().text()).toBe('test children node');
  });
});
