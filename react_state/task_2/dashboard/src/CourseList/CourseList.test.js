import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

describe('CourseList', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders the header row plus one row per course', () => {
    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
    ];
    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    expect(wrapper.find(CourseListRow).length).toBe(3);
  });

  it('renders an empty-state row when there are no courses', () => {
    const wrapper = shallow(<CourseList listCourses={[]} />);
    expect(wrapper.find(CourseListRow).length).toBe(2);
    expect(wrapper.find(CourseListRow).at(1).prop('textFirstCell')).toBe('No course available yet');
  });
});
