import { List } from 'immutable';
import { getListCourses } from './courseSelector';
import { courseReducer } from '../reducers/courseReducer';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE } from '../actions/courseActionTypes';

const data = [
  { id: '1', name: 'ES6', credit: 60 },
  { id: '2', name: 'Webpack', credit: 20 },
  { id: '3', name: 'React', credit: 40 },
];

describe('getListCourses', () => {
  it('returns a List of the course entities within the reducer', () => {
    const state = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    const courses = getListCourses(state);

    expect(List.isList(courses)).toBe(true);
    expect(courses.toJS()).toEqual([
      { id: '1', name: 'ES6', isSelected: false, credit: 60 },
      { id: '2', name: 'Webpack', isSelected: false, credit: 20 },
      { id: '3', name: 'React', isSelected: false, credit: 40 },
    ]);
  });

  it('reflects a selected course', () => {
    const fetched = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    const state = courseReducer(fetched, { type: SELECT_COURSE, index: '2' });

    expect(getListCourses(state).map((course) => course.get('isSelected')).toJS())
      .toEqual([false, true, false]);
  });

  it('returns an empty List when no course was fetched', () => {
    const courses = getListCourses(courseReducer(undefined, {}));
    expect(List.isList(courses)).toBe(true);
    expect(courses.size).toBe(0);
  });
});
