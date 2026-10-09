import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { getFullYear, getFooterCopy } from '../utils/utils';

const styles = StyleSheet.create({
  footer: {
    borderTop: '3px solid #e0354b',
    padding: '1rem',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export const Footer = ({ user, isLoggedIn }) => (
  <footer className={css(styles.footer)}>
    <p>
      Copyright {getFullYear()} - {getFooterCopy(true)}
    </p>
    {isLoggedIn && user && (
      <p>
        <a href="#contact">Contact us</a>
      </p>
    )}
  </footer>
);

Footer.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  isLoggedIn: PropTypes.bool,
};

Footer.defaultProps = {
  user: null,
  isLoggedIn: false,
};

export const mapStateToProps = (state) => ({
  user: state.get('user'),
  isLoggedIn: state.get('isUserLoggedIn'),
});

export default connect(mapStateToProps)(Footer);
