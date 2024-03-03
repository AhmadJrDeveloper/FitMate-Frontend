import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const LoadingSpinner = () => {
  return <div>Loading...</div>;
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const storedToken = localStorage.getItem('token');

  if (!storedToken || !authContext || authContext.auth === false) {
    return <Navigate to="/adminlogin" replace />;
  }

  if (authContext.auth === null) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export const UserProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const storedToken = localStorage.getItem('token');

  if (!storedToken || !authContext || authContext.userAuth === false) {
    return <Navigate to="/login" replace />;
  }

  if (authContext.userAuth === null) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};
