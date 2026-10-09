import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  selectCourse,
  unSelectCourse,
  setCourses,
  fetchCourses,
} from './courseActionCreators';
import {
  SELECT_COURSE,
  UNSELECT_COURSE,
  FETCH_COURSE_SUCCESS,
} from './courseActionTypes';

describe('course action creators', () => {
  it('selectCourse returns the SELECT_COURSE action with the index', () => {
    expect(selectCourse(1)).toEqual({
      type: SELECT_COURSE,
      index: 1,
    });
  });

  it('unSelectCourse returns the UNSELECT_COURSE action with the index', () => {
    expect(unSelectCourse(1)).toEqual({
      type: UNSELECT_COURSE,
      index: 1,
    });
  });

  describe('fetchCourses', () => {
    const mockStore = configureStore([thunk]);
    const data = [
      { id: '1', name: 'ES6', credit: 60 },
      { id: '2', name: 'Webpack', credit: 20 },
      { id: '3', name: 'React', credit: 40 },
    ];

    afterEach(() => {
      fetchMock.restore();
    });

    it('setCourses returns the FETCH_COURSE_SUCCESS action with the data', () => {
      expect(setCourses(data)).toEqual({ type: FETCH_COURSE_SUCCESS, data });
    });

    it('fetches /courses.json and dispatches setCourses with the data', () => {
      fetchMock.getOnce('/courses.json', data);
      const store = mockStore({});

      return store.dispatch(fetchCourses()).then(() => {
        expect(fetchMock.called('/courses.json')).toBe(true);
        expect(store.getActions()).toEqual([{ type: FETCH_COURSE_SUCCESS, data }]);
      });
    });

    it('dispatches nothing when the request fails', () => {
      fetchMock.getOnce('/courses.json', { throws: new Error('Network error') });
      const store = mockStore({});

      return store.dispatch(fetchCourses()).then(() => {
        expect(store.getActions()).toEqual([]);
      });
    });
  });
});
