import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('loggedInUser') !== null;
  
  if (!isAuthenticated) {
    // Redirect them to the login page, but replace the current location
    return <Navigate to="/Project-Management" replace />;
  }

  return children;
};

export default ProtectedRoute;
