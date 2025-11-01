// dashboard/src/components/ProtectedRoute.jsx
import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const [cookies] = useCookies(['token']);

   console.log("ProtectedRoute checking for token:", cookies.token);

  // If the token cookie exists, render the child route (e.g., Dashboard).
  // Otherwise, navigate them to the login page.
  return cookies.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;