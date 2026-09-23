import React from 'react';
import PropTypes from 'prop-types';

export const user = {
  email: '',
  password: '',
  isLoggedIn: false,
};

export const logOut = () => {};

export const AppContext = React.createContext({
  user,
  logOut,
});

export const UserShape = PropTypes.shape({
  email: PropTypes.string,
  password: PropTypes.string,
  isLoggedIn: PropTypes.bool,
});

export default AppContext;
