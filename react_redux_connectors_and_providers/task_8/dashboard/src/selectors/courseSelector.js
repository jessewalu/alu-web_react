import { Map } from 'immutable';

export const getListCourses = (state) => (
  state.get('courses', Map()).valueSeq().toList()
);

export default getListCourses;
