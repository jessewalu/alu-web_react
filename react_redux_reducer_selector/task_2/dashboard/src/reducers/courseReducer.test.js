import { courseReducer } from './courseReducer';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';

const data = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const fetched = [
  { id: 1, name: 'ES6', isSelected: false, credit: 60 },
  { id: 2, name: 'Webpack', isSelected: false, credit: 20 },
  { id: 3, name: 'React', isSelected: false, credit: 40 },
];

describe('courseReducer', () => {
  it('returns an empty array as the default state', () => {
    expect(courseReducer(undefined, {})).toEqual([]);
    expect(courseReducer()).toEqual([]);
  });

  it('returns the data passed with FETCH_COURSE_SUCCESS and isSelected set to false', () => {
    expect(courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data })).toEqual(fetched);
  });

  it('updates the right item with SELECT_COURSE', () => {
    const state = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    expect(courseReducer(state, { type: SELECT_COURSE, index: 2 })).toEqual([
      { id: 1, name: 'ES6', isSelected: false, credit: 60 },
      { id: 2, name: 'Webpack', isSelected: true, credit: 20 },
      { id: 3, name: 'React', isSelected: false, credit: 40 },
    ]);
  });

  it('updates the right item with UNSELECT_COURSE', () => {
    const state = [
      { id: 1, name: 'ES6', isSelected: false, credit: 60 },
      { id: 2, name: 'Webpack', isSelected: true, credit: 20 },
      { id: 3, name: 'React', isSelected: false, credit: 40 },
    ];
    expect(courseReducer(state, { type: UNSELECT_COURSE, index: 2 })).toEqual(fetched);
  });

  it('does not mutate the previous state', () => {
    const state = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    Object.freeze(state);
    state.forEach(Object.freeze);
    const next = courseReducer(state, { type: SELECT_COURSE, index: 1 });
    expect(next).not.toBe(state);
    expect(state[0].isSelected).toBe(false);
  });
});
