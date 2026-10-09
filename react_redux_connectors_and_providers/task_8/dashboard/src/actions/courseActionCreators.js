import {
  SELECT_COURSE,
  UNSELECT_COURSE,
  FETCH_COURSE_SUCCESS,
} from './courseActionTypes';

export const selectCourse = (index) => ({
  type: SELECT_COURSE,
  index,
});

export const unSelectCourse = (index) => ({
  type: UNSELECT_COURSE,
  index,
});

export const setCourses = (data) => ({
  type: FETCH_COURSE_SUCCESS,
  data,
});

export const fetchCourses = () => (dispatch) => (
  fetch('/courses.json')
    .then((response) => response.json())
    .then((data) => dispatch(setCourses(data)))
    // A failed request leaves the list of courses untouched.
    .catch(() => {})
);
