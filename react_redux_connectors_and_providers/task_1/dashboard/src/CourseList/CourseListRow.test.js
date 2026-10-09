import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';

describe('<CourseListRow />', () => {
  it('renders one th with colSpan 2 for a header row with a single cell', () => {
    const wrapper = shallow(<CourseListRow isHeader textFirstCell="Available courses" />);
    expect(wrapper.find('th')).toHaveLength(1);
    expect(wrapper.find('th').prop('colSpan')).toBe('2');
  });

  it('renders two th for a header row with two cells', () => {
    const wrapper = shallow(
      <CourseListRow isHeader textFirstCell="Course name" textSecondCell="Credit" />,
    );
    expect(wrapper.find('th')).toHaveLength(2);
  });

  it('renders two td for a regular row', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="ES6" textSecondCell={60} />);
    expect(wrapper.find('td')).toHaveLength(2);
    expect(wrapper.find('td').at(1).text()).toBe('60');
  });
});
