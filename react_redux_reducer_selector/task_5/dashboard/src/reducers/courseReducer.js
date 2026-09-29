import { Map, fromJS } from 'immutable';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';

export const initialState = Map();

export const courseReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS: {
      const normalizedData = coursesNormalizer(
        action.data.map((course) => ({ ...course, isSelected: false })),
      );
      return state.mergeDeep(fromJS(normalizedData.entities));
    }
    case SELECT_COURSE:
      return state.setIn(['courses', String(action.index), 'isSelected'], true);
    case UNSELECT_COURSE:
      return state.setIn(['courses', String(action.index), 'isSelected'], false);
    default:
      return state;
  }
};

export default courseReducer;
