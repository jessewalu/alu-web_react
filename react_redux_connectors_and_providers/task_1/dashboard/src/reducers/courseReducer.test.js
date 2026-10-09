import { Map } from 'immutable';
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

const fetched = {
  courses: {
    1: { id: 1, name: 'ES6', isSelected: false, credit: 60 },
    2: { id: 2, name: 'Webpack', isSelected: false, credit: 20 },
    3: { id: 3, name: 'React', isSelected: false, credit: 40 },
  },
};

describe('courseReducer', () => {
  it('returns an empty Map as the default state', () => {
    const state = courseReducer(undefined, {});
    expect(Map.isMap(state)).toBe(true);
    expect(state.toJS()).toEqual({});
    expect(courseReducer().toJS()).toEqual({});
  });

  it('normalizes and merges the data passed with FETCH_COURSE_SUCCESS', () => {
    const state = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    expect(state.toJS()).toEqual(fetched);
  });

  it('updates the right item with SELECT_COURSE', () => {
    const state = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    const next = courseReducer(state, { type: SELECT_COURSE, index: 2 });
    expect(next.toJS()).toEqual({
      courses: {
        1: { id: 1, name: 'ES6', isSelected: false, credit: 60 },
        2: { id: 2, name: 'Webpack', isSelected: true, credit: 20 },
        3: { id: 3, name: 'React', isSelected: false, credit: 40 },
      },
    });
  });

  it('updates the right item with UNSELECT_COURSE', () => {
    const fetchedState = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    const selected = courseReducer(fetchedState, { type: SELECT_COURSE, index: 2 });
    const next = courseReducer(selected, { type: UNSELECT_COURSE, index: 2 });
    expect(next.toJS()).toEqual(fetched);
  });

  it('returns a new Map and leaves the previous state untouched', () => {
    const state = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    const next = courseReducer(state, { type: SELECT_COURSE, index: 1 });
    expect(next).not.toBe(state);
    expect(state.getIn(['courses', '1', 'isSelected'])).toBe(false);
  });
});
