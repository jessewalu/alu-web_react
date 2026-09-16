import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    margin: '0',
  },

  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: '100%',

    '@media (max-width: 900px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '10px',

    '@media (max-width: 900px)': {
      width: '100%',
      marginRight: '0',
      marginBottom: '10px',
    },
  },

  label: {
    marginRight: '8px',
    fontWeight: 'bold',
  },

  input: {
    padding: '6px',

    '@media (max-width: 900px)': {
      flexGrow: 1,
    },
  },

  button: {
    padding: '8px 16px',
    backgroundColor: '#153354',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',

    '@media (max-width: 900px)': {
      width: '100%',
      marginTop: '10px',
    },
  },
});

function Login() {
  return (
    <React.Fragment>
      <p className={css(styles.login)}>Login to access the full dashboard</p>
      <div className={css(styles.form)}>
        <div className={css(styles.inputGroup)}>
          <label className={css(styles.label)} htmlFor="email">
            Email
          </label>
          <input
            className={css(styles.input)}
            type="email"
            id="email"
            name="email"
          />
        </div>
        <div className={css(styles.inputGroup)}>
          <label className={css(styles.label)} htmlFor="password">
            Password
          </label>
          <input
            className={css(styles.input)}
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button className={css(styles.button)} type="button">
          OK
        </button>
      </div>
    </React.Fragment>
  );
}

export default Login;
