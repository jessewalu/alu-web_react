import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  footer: {
    borderTop: '2px solid #e1002b',
    padding: '10px 20px',
    marginTop: '20px',
    textAlign: 'center',
  },
});

function Footer() {
  return (
    <div className={css(styles.footer)}>
      <p>Copyright {new Date().getFullYear()} - School dashboard</p>
    </div>
  );
}

export default Footer;
