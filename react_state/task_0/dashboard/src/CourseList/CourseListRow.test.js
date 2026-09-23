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
});
