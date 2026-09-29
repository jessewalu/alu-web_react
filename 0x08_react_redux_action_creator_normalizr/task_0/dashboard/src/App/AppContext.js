import React from 'react';

export const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

export const defaultLogOut = () => {};

export const AppContext = React.createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});

export default AppContext;
