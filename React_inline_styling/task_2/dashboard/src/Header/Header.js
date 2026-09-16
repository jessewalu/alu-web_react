import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/logo.jpg';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '3px solid #e01d47',
  },

  logo: {
    height: '50px',
    marginRight: '20px',
  },

  title: {
    fontSize: '1.4rem',
    color: '#153354',
  },
});

function Header() {
  return (
    <div className={css(styles.header)}>
      <img src={logo} className={css(styles.logo)} alt="School logo" />
      <h1 className={css(styles.title)}>School dashboard</h1>
    </div>
  );
}

export default Header;
