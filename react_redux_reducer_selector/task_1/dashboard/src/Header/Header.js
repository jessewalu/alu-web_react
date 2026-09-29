import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/logo.svg';
import { AppContext } from '../App/AppContext';

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

class Header extends Component {
  render() {
    const { user, logOut } = this.context;

    return (
      <header className={css(styles.header)}>
        <div className={css(styles.brand)}>
          <img src={logo} className={css(styles.logo)} alt="logo" />
          <h1>School dashboard</h1>
        </div>
        {user.isLoggedIn && (
          <section id="logoutSection">
            Welcome <strong>{user.email}</strong>{' '}
            <button type="button" onClick={logOut}>
              logout
            </button>
          </section>
        )}
      </header>
    );
  }
}

Header.contextType = AppContext;

export default Header;
