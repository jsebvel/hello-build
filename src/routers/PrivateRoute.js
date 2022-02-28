import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth'

export const PrivateRoute = ({ children }) => {
    const context = useContext(AuthContext);
    return localStorage.getItem('username') 
     ? children
     : <Navigate to='/' />
}
