import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545',
  },
  row: {
    backgroundColor: '#f5f5f5ab',
  },
  rowChecked: {
    backgroundColor: '#e6e4e4',
  },
});

const CourseListRow = ({
  id,
  isHeader,
  isChecked,
  textFirstCell,
  textSecondCell,
  onChangeRow,
}) => {
  if (isHeader) {
    return (
      <tr className={css(styles.headerRow)}>
        {textSecondCell === null ? (
          <th colSpan="2">{textFirstCell}</th>
        ) : (
          <>
            <th>{textFirstCell}</th>
            <th>{textSecondCell}</th>
          </>
        )}
      </tr>
    );
  }

  const rowClassName = css(isChecked ? styles.rowChecked : styles.row);

  return (
    <tr className={rowClassName}>
      {textSecondCell === null ? (
        <td colSpan="2">{textFirstCell}</td>
      ) : (
        <>
          <td>
            {id !== null && (
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(event) => onChangeRow(id, event.target.checked)}
              />
            )}
            {textFirstCell}
          </td>
          <td>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
};

CourseListRow.propTypes = {
  id: PropTypes.string,
  isHeader: PropTypes.bool,
  isChecked: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeRow: PropTypes.func,
};

CourseListRow.defaultProps = {
  id: null,
  isHeader: false,
  isChecked: false,
  textSecondCell: null,
  onChangeRow: () => {},
};

export default CourseListRow;
