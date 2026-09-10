import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

const sampleCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('CourseList', () => {
  describe('with an empty (or missing) listCourses', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<CourseList />);
    });

    it('renders without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('renders a "No course available yet" row', () => {
      const rows = wrapper.find(CourseListRow);
      const emptyRow = rows.filterWhere(
        (row) => row.prop('textFirstCell') === 'No course available yet'
      );
      expect(emptyRow.length).toBe(1);
    });
  });

  describe('with a populated listCourses', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<CourseList listCourses={sampleCourses} />);
    });

    it('renders without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('renders 5 CourseListRow rows (2 header + 3 course rows)', () => {
      expect(wrapper.find(CourseListRow).length).toBe(5);
    });
  });
});
