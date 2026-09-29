import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { getFullYear, getFooterCopy } from '../utils/utils';
import { AppContext } from '../App/AppContext';

const styles = StyleSheet.create({
  footer: {
    borderTop: '3px solid #e0354b',
    padding: '1rem',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

class Footer extends Component {
  render() {
    const { user } = this.context;

    return (
      <footer className={css(styles.footer)}>
        <p>
          Copyright {getFullYear()} - {getFooterCopy(true)}
        </p>
        {user.isLoggedIn && (
          <p>
            <a href="#contact">Contact us</a>
          </p>
        )}
      </footer>
    );
  }
}

Footer.contextType = AppContext;

export default Footer;
