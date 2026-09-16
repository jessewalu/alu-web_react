import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    margin: '0',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '260px',
  },

  label: {
    marginTop: '10px',
    fontWeight: 'bold',
  },

  input: {
    padding: '6px',
    marginTop: '4px',
  },

  button: {
    marginTop: '16px',
    padding: '8px',
    backgroundColor: '#153354',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
});

function Login() {
  return (
    <React.Fragment>
      <p className={css(styles.login)}>Login to access the full dashboard</p>
      <div className={css(styles.form)}>
        <label className={css(styles.label)} htmlFor="email">
          Email
        </label>
        <input
          className={css(styles.input)}
          type="email"
          id="email"
          name="email"
        />
        <label className={css(styles.label)} htmlFor="password">
          Password
        </label>
        <input
          className={css(styles.input)}
          type="password"
          id="password"
          name="password"
        />
        <button className={css(styles.button)} type="button">
          OK
        </button>
      </div>
    </React.Fragment>
  );
}

export default Login;
