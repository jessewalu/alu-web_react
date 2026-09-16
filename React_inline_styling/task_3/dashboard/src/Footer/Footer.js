import React from 'react';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div>
      <p>Copyright {year} - School dashboard</p>
    </div>
  );
}

export default Footer;
