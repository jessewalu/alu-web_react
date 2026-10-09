import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/logo.svg';
import { logout } from '../actions/uiActionCreators';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '3px solid #e0354b',
    padding: '0 1rem',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    color: '#e0354b',
  },
  logo: {
    width: '80px',
    height: '80px',
  },
});

export const Header = ({ user, isLoggedIn, logout: logoutUser }) => (
  <header className={css(styles.header)}>
    <div className={css(styles.brand)}>
      <img src={logo} className={css(styles.logo)} alt="logo" />
      <h1>School dashboard</h1>
    </div>
    {isLoggedIn && user && (
      <section id="logoutSection">
        Welcome <strong>{user.email}</strong>{' '}
        <button type="button" onClick={logoutUser}>
          logout
        </button>
      </section>
    )}
  </header>
);

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func,
};

Header.defaultProps = {
  user: null,
  isLoggedIn: false,
  logout: () => {},
};

export const mapStateToProps = (state) => ({
  user: state.get('user'),
  isLoggedIn: state.get('isUserLoggedIn'),
});

export const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
