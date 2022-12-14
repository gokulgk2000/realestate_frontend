import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const AdminProtected = () => {
    const admin =JSON.parse(localStorage.getItem('authAdmin'))
  return (
    admin?.username ? <Outlet /> : <Navigate to="/admin-page" />
  )
}

export default AdminProtected
