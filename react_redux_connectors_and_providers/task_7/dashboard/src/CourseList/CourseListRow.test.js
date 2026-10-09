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

  it('renders two td and a checkbox for a regular row', () => {
    const wrapper = shallow(
      <CourseListRow id="1" textFirstCell="ES6" textSecondCell={60} />,
    );
    expect(wrapper.find('td')).toHaveLength(2);
    expect(wrapper.find('td').at(1).text()).toBe('60');
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
  });

  it('renders a single cell without a checkbox when there is no second cell', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="No course available yet" />);
    expect(wrapper.find('td')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(0);
  });

  it('uses the isChecked prop for the checkbox, without any local state', () => {
    const unchecked = shallow(<CourseListRow id="1" textFirstCell="ES6" textSecondCell={60} />);
    const checked = shallow(
      <CourseListRow id="1" textFirstCell="ES6" textSecondCell={60} isChecked />,
    );
    expect(unchecked.find('input').prop('checked')).toBe(false);
    expect(checked.find('input').prop('checked')).toBe(true);
    expect(checked.instance()).toBeNull();
  });

  it('calls onChangeRow with the id and the new checked value', () => {
    const onChangeRow = jest.fn();
    const wrapper = shallow(
      <CourseListRow id="2" textFirstCell="Webpack" textSecondCell={20} onChangeRow={onChangeRow} />,
    );
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChangeRow).toHaveBeenCalledWith('2', true);
    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(onChangeRow).toHaveBeenLastCalledWith('2', false);
  });
});
