import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import CourseListRow from './CourseListRow';

const styles = StyleSheet.create({
  table: {
    width: '100%',
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
  },
});

const CourseList = ({ listCourses }) => (
  <table id="CourseList" className={css(styles.table)}>
    <thead>
      <CourseListRow textFirstCell="Available courses" isHeader />
      <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader />
    </thead>
    <tbody>
      {listCourses.length === 0 ? (
        <CourseListRow textFirstCell="No course available yet" />
      ) : (
        listCourses.map((course) => (
          <CourseListRow
            key={course.id}
            textFirstCell={course.name}
            textSecondCell={course.credit}
          />
        ))
      )}
    </tbody>
  </table>
);

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      credit: PropTypes.number.isRequired,
    }),
  ),
};

CourseList.defaultProps = {
  listCourses: [],
};

export default CourseList;
