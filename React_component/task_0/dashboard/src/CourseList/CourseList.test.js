import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('<CourseList />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the empty-state rows when no courses are passed', () => {
    const wrapper = shallow(<CourseList listCourses={[]} />);
    expect(wrapper.find('CourseListRow').length).toBe(2);
  });

  it('renders 1 header row + 1 row per course when courses are passed', () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    expect(wrapper.find('CourseListRow').length).toBe(listCourses.length + 1);
  });
});
