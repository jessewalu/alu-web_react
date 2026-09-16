import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#f5f5f5ab',
  },

  headerRow: {
    backgroundColor: '#deb5b545',
  },

  cell: {
    border: '1px solid #ddd',
    padding: '8px 12px',
    textAlign: 'left',
  },

  headerCell: {
    borderBottom: '3px solid #e01d47',
  },
});

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  const cellClass = css(styles.cell, isHeader && styles.headerCell);

  return (
    <tr className={css(isHeader ? styles.headerRow : styles.row)}>
      {isHeader ? (
        textSecondCell === null ? (
          <th className={cellClass} colSpan={2}>
            {textFirstCell}
          </th>
        ) : (
          <React.Fragment>
            <th className={cellClass}>{textFirstCell}</th>
            <th className={cellClass}>{textSecondCell}</th>
          </React.Fragment>
        )
      ) : (
        <React.Fragment>
          <td className={cellClass}>{textFirstCell}</td>
          <td className={cellClass}>{textSecondCell}</td>
        </React.Fragment>
      )}
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textFirstCell: '',
  textSecondCell: null,
};

export default CourseListRow;
