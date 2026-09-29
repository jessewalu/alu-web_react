import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import BodySection from './BodySection';

const styles = StyleSheet.create({
  margin: {
    marginBottom: '40px',
  },
});

const BodySectionWithMarginBottom = ({ title, children }) => (
  <div className={css(styles.margin)}>
    <BodySection title={title}>{children}</BodySection>
  </div>
);

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

BodySectionWithMarginBottom.defaultProps = {
  children: null,
};

export default BodySectionWithMarginBottom;
