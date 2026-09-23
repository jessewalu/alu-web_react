import React from 'react';
import { StyleSheet, css } from 'aphrodite';
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
});

function Header() {
  return (
    <div className={css(styles.header)}>
      <img
        className={css(styles.logo)}
        src={logo}
        alt="ALU logo"
      />
      <h1 className={css(styles.title)}>School dashboard</h1>
    </div>
  );
}

export default Header;
