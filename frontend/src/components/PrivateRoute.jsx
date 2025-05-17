import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const access = localStorage.getItem('accessToken');
  return access ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
