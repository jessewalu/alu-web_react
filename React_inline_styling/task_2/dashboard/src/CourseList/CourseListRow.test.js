import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import CourseListRow from './CourseListRow';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('<CourseListRow />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="Header" />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders 2 td when isHeader is false', () => {
    const wrapper = shallow(
      <CourseListRow textFirstCell="ES6" textSecondCell="60" />
    );
    expect(wrapper.find('td').length).toBe(2);
  });

  it('renders 1 th spanning 2 columns when isHeader is true and textSecondCell is null', () => {
    const wrapper = shallow(<CourseListRow isHeader textFirstCell="Title" />);
    expect(wrapper.find('th').length).toBe(1);
    expect(wrapper.find('th').prop('colSpan')).toBe(2);
  });

  it('renders 2 th when isHeader is true and textSecondCell is set', () => {
    const wrapper = shallow(
      <CourseListRow isHeader textFirstCell="Course" textSecondCell="Credit" />
    );
    expect(wrapper.find('th').length).toBe(2);
  });

  it('applies a class to the tr element', () => {
    const wrapper = shallow(
      <CourseListRow textFirstCell="ES6" textSecondCell="60" />
    );
    expect(wrapper.find('tr').prop('className')).toBeTruthy();
  });

  it('applies a different class to a header row than to a default row', () => {
    const headerRow = shallow(
      <CourseListRow isHeader textFirstCell="Course" textSecondCell="Credit" />
    );
    const defaultRow = shallow(
      <CourseListRow textFirstCell="ES6" textSecondCell="60" />
    );
    expect(headerRow.find('tr').prop('className')).not.toBe(
      defaultRow.find('tr').prop('className')
    );
  });

  it('applies a class to the cells', () => {
    const wrapper = shallow(
      <CourseListRow textFirstCell="ES6" textSecondCell="60" />
    );
    expect(wrapper.find('td').first().prop('className')).toBeTruthy();
  });
});
