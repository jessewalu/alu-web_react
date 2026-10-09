import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('<CourseList />', () => {
  it('renders without crashing', () => {
    expect(shallow(<CourseList />).exists()).toBe(true);
  });

  it('renders the two header rows and a fallback row when the list is empty', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.find(CourseListRow)).toHaveLength(3);
    expect(wrapper.find(CourseListRow).last().prop('textFirstCell')).toBe(
      'No course available yet',
    );
  });

  it('renders one row per course plus the two header rows', () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    expect(wrapper.find(CourseListRow)).toHaveLength(5);
  });
});
