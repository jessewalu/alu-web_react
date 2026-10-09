import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { StyleSheet, css } from 'aphrodite';
import CourseListRow from './CourseListRow';
import {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from '../actions/courseActionCreators';
import { getListCourses } from '../selectors/courseSelector';

const styles = StyleSheet.create({
  table: {
    width: '100%',
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
  },
});

export class CourseList extends Component {
  componentDidMount() {
    const { fetchCourses: fetchAll } = this.props;
    fetchAll();
  }

  onChangeRow = (id, checked) => {
    const { selectCourse: select, unSelectCourse: unSelect } = this.props;

    if (checked) {
      select(id);
    } else {
      unSelect(id);
    }
  };

  render() {
    const { listCourses } = this.props;

    return (
      <table id="CourseList" className={css(styles.table)}>
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader />
          <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader />
        </thead>
        <tbody>
          {listCourses.size === 0 ? (
            <CourseListRow textFirstCell="No course available yet" />
          ) : (
            listCourses.map((course) => (
              <CourseListRow
                key={course.get('id')}
                id={course.get('id')}
                textFirstCell={course.get('name')}
                textSecondCell={course.get('credit')}
                isChecked={course.get('isSelected')}
                onChangeRow={this.onChangeRow}
              />
            )).toArray()
          )}
        </tbody>
      </table>
    );
  }
}

CourseList.propTypes = {
  listCourses: PropTypes.instanceOf(List),
  fetchCourses: PropTypes.func,
  selectCourse: PropTypes.func,
  unSelectCourse: PropTypes.func,
};

CourseList.defaultProps = {
  listCourses: List(),
  fetchCourses: () => {},
  selectCourse: () => {},
  unSelectCourse: () => {},
};

export const mapStateToProps = (state) => ({
  listCourses: getListCourses(state.courses),
});

export const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
