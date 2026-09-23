import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { AppContext } from '../App/AppContext';
import logo from '../assets/logo.png';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '3px solid #e1002b',
    padding: '10px 20px',
  },
  logo: {
    width: '250px',
  },
  title: {
    marginLeft: '20px',
  },
  link: {
    cursor: 'pointer',
    color: '#e1002b',
  },
});

class Header extends React.Component {
  render() {
    const { user, logOut } = this.context;

    return (
      <div className={css(styles.header)}>
        <img
          className={css(styles.logo)}
          src={logo}
          alt="ALU logo"
        />
        <h1 className={css(styles.title)}>School dashboard</h1>
        {user.isLoggedIn && (
          <p id="logoutSection">
            Welcome <strong>{user.email}</strong> (
            <a onClick={logOut} className={css(styles.link)}>Log out</a>)
          </p>
        )}
      </div>
    );
  }
}

Header.contextType = AppContext;

export default Header;
