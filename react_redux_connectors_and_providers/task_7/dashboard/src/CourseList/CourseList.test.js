import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, List } from 'immutable';
import {
  CourseList,
  mapStateToProps,
  mapDispatchToProps,
} from './CourseList';
import CourseListRow from './CourseListRow';
import {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from '../actions/courseActionCreators';

const listCourses = fromJS([
  { id: '1', name: 'ES6', isSelected: false, credit: 60 },
  { id: '2', name: 'Webpack', isSelected: true, credit: 20 },
  { id: '3', name: 'React', isSelected: false, credit: 40 },
]);

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

  it('passes isChecked from the isSelected attribute and onChangeRow to each row', () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    const rows = wrapper.find(CourseListRow).filterWhere((row) => !row.prop('isHeader'));

    expect(rows.map((row) => row.prop('isChecked'))).toEqual([false, true, false]);
    expect(rows.first().prop('id')).toBe('1');
    expect(rows.first().prop('onChangeRow')).toBe(wrapper.instance().onChangeRow);
  });

  it('dispatches fetchCourses when the component is mounted', () => {
    const fetchSpy = jest.fn();
    shallow(<CourseList fetchCourses={fetchSpy} />);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('dispatches selectCourse or unSelectCourse when onChangeRow is called', () => {
    const select = jest.fn();
    const unSelect = jest.fn();
    const wrapper = shallow(
      <CourseList selectCourse={select} unSelectCourse={unSelect} />,
    );

    wrapper.instance().onChangeRow('2', true);
    expect(select).toHaveBeenCalledWith('2');
    expect(unSelect).not.toHaveBeenCalled();

    wrapper.instance().onChangeRow('2', false);
    expect(unSelect).toHaveBeenCalledWith('2');
    expect(select).toHaveBeenCalledTimes(1);
  });
});

describe('CourseList connectors', () => {
  it('mapStateToProps maps listCourses with the getListCourses selector', () => {
    const state = {
      courses: fromJS({
        courses: {
          1: { id: '1', name: 'ES6', isSelected: false, credit: 60 },
          2: { id: '2', name: 'Webpack', isSelected: true, credit: 20 },
        },
      }),
    };
    const { listCourses: courses } = mapStateToProps(state);
    expect(List.isList(courses)).toBe(true);
    expect(courses.size).toBe(2);
    expect(courses.first().get('name')).toBe('ES6');
  });

  it('mapDispatchToProps maps the three action creators', () => {
    expect(mapDispatchToProps).toEqual({ fetchCourses, selectCourse, unSelectCourse });
  });
});
