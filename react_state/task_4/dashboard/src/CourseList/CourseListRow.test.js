import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import CourseListRow from './CourseListRow';

describe('CourseListRow', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders one th spanning two columns when textSecondCell is null', () => {
    const wrapper = shallow(<CourseListRow isHeader textFirstCell="Header" textSecondCell={null} />);
    expect(wrapper.find('th').length).toBe(1);
  });

  it('renders two th when textSecondCell is provided', () => {
    const wrapper = shallow(<CourseListRow isHeader textFirstCell="Course" textSecondCell="Credit" />);
    expect(wrapper.find('th').length).toBe(2);
  });

  it('renders two td for a non-header row', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="ES6" textSecondCell="60" />);
    expect(wrapper.find('td').length).toBe(2);
  });

  it('renders a checkbox in the first cell for a non-header row', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="ES6" textSecondCell="60" />);
    expect(wrapper.find('input[type="checkbox"]').length).toBe(1);
  });

  it('does not render a checkbox for a header row', () => {
    const wrapper = shallow(<CourseListRow isHeader textFirstCell="Course" textSecondCell="Credit" />);
    expect(wrapper.find('input[type="checkbox"]').length).toBe(0);
  });

  it('starts unchecked and toggles the checked state on change', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="ES6" textSecondCell="60" />);
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(false);
    wrapper.find('input[type="checkbox"]').simulate('change');
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(true);
    wrapper.find('input[type="checkbox"]').simulate('change');
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(false);
  });

  it('applies the rowChecked style only once the checkbox is checked', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="ES6" textSecondCell="60" />);
    const initialClassName = wrapper.find('tr').prop('className');
    wrapper.find('input[type="checkbox"]').simulate('change');
    const checkedClassName = wrapper.find('tr').prop('className');
    expect(checkedClassName).not.toBe(initialClassName);
  });
});
