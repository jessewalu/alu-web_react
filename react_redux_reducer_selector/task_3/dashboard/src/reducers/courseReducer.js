import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';

const setSelected = (state, id, isSelected) => (
  state.map((course) => (course.id === id ? { ...course, isSelected } : course))
);

export const courseReducer = (state = [], action = {}) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      return action.data.map((course) => ({ ...course, isSelected: false }));
    case SELECT_COURSE:
      return setSelected(state, action.index, true);
    case UNSELECT_COURSE:
      return setSelected(state, action.index, false);
    default:
      return state;
  }
};

export default courseReducer;
