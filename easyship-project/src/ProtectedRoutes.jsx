import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// User Route Component
const UserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() && getUserRole() === 'user' ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

// Helper functions to check user login and role
const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return 'user'; // Assuming 'role' is stored in the JWT payload
  }
  return null;
};

export default UserRoute;
