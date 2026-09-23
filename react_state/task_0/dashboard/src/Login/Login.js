import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  loginSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '15px',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  label: {
    marginRight: '10px',
  },
  input: {
    marginRight: '20px',
  },
});

class Login extends React.Component {
  render() {
    return (
      <div className={css(styles.loginSection)}>
        <p>
          <label className={css(styles.label)} htmlFor="email">Email</label>
          <input className={css(styles.input)} type="email" id="email" />
        </p>
        <p>
          <label className={css(styles.label)} htmlFor="password">Password</label>
          <input className={css(styles.input)} type="password" id="password" />
        </p>
        <button>OK</button>
      </div>
    );
  }
}

export default Login;
