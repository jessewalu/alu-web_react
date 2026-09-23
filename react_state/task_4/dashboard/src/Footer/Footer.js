import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { AppContext } from '../App/AppContext';

const styles = StyleSheet.create({
  footer: {
    borderTop: '2px solid #e1002b',
    padding: '10px 20px',
    marginTop: '20px',
    textAlign: 'center',
  },
  link: {
    color: '#e1002b',
  },
});

function Footer() {
  return (
    <AppContext.Consumer>
      {({ user }) => (
        <div className={css(styles.footer)}>
          <p>Copyright {new Date().getFullYear()} - School dashboard</p>
          {user.isLoggedIn && (
            <p>
              <a href="#contact" className={css(styles.link)}>Contact us</a>
            </p>
          )}
        </div>
      )}
    </AppContext.Consumer>
  );
}

export default Footer;
