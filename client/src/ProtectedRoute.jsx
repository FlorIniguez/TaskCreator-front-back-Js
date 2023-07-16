import React from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const {loadings, isAuthenticated} =  useAuth();
  
  if (loadings) return <h1> Loading ....</h1>
  if (!loadings && !isAuthenticated) return <Navigate to='/login' replace />
  return (
  <Outlet/>
  )
}

export default ProtectedRoute