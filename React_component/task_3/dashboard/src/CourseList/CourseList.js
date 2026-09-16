import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';
import { CourseShape } from '../utils/utils';
import './CourseList.css';

function CourseList({ listCourses }) {
  if (!listCourses || listCourses.length === 0) {
    return (
      <table id="CourseList" className="CourseList">
        <tbody>
          <CourseListRow isHeader textFirstCell="Available courses" />
          <CourseListRow isHeader textFirstCell="No course available yet" />
        </tbody>
      </table>
    );
  }

  return (
    <table id="CourseList" className="CourseList">
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
