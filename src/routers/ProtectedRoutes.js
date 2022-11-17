import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const authUser =JSON.parse(localStorage.getItem('authUser'))
  return (
    authUser?.userID ? <Outlet /> : <Navigate to="/login" />
  )
}

export default ProtectedRoutes