import React from 'react';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="App-footer">
      <p>Copyright {year} - School dashboard</p>
    </div>
  );
}

export default Footer;
