import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import CourseListRow from './CourseListRow';
import { CourseShape } from '../utils/utils';

const styles = StyleSheet.create({
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
});

function CourseList({ listCourses }) {
  if (!listCourses || listCourses.length === 0) {
    return (
      <table id="CourseList" className={css(styles.table)}>
        <tbody>
          <CourseListRow isHeader textFirstCell="Available courses" />
          <CourseListRow isHeader textFirstCell="No course available yet" />
        </tbody>
      </table>
    );
  }

  return (
    <table id="CourseList" className={css(styles.table)}>
      <thead>
        <CourseListRow isHeader textFirstCell="Course name" textSecondCell="Credit" />
      </thead>
      <tbody>
        {listCourses.map((course) => (
          <CourseListRow
            key={course.id}
            textFirstCell={course.name}
            textSecondCell={course.credit}
          />
        ))}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape),
};

CourseList.defaultProps = {
  listCourses: [],
};

export default CourseList;
