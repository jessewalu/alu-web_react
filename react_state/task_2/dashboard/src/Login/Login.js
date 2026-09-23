import React from 'react';
import PropTypes from 'prop-types';
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
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      enableSubmit: false,
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleChangeEmail(event) {
    const email = event.target.value;
    this.setState({ email }, () => {
      this.validateForm();
    });
  }

  handleChangePassword(event) {
    const password = event.target.value;
    this.setState({ password }, () => {
      this.validateForm();
    });
  }

  validateForm() {
    const { email, password } = this.state;
    this.setState({
      enableSubmit: email !== '' && password !== '',
    });
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.logIn(email, password);
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <form className={css(styles.loginSection)} onSubmit={this.handleLoginSubmit}>
        <p>
          <label className={css(styles.label)} htmlFor="email">Email</label>
          <input
            className={css(styles.input)}
            type="email"
            id="email"
            value={email}
            onChange={this.handleChangeEmail}
          />
        </p>
        <p>
          <label className={css(styles.label)} htmlFor="password">Password</label>
          <input
            className={css(styles.input)}
            type="password"
            id="password"
            value={password}
            onChange={this.handleChangePassword}
          />
        </p>
        <input type="submit" value="OK" disabled={!enableSubmit} />
      </form>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func,
};

Login.defaultProps = {
  logIn: () => {},
};

export default Login;
