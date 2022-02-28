import React, { useContext } from "react"
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";

export const PublicRouter = ({ children }) => {
    const context = useContext(AuthContext);
    return localStorage.getItem('username') 
    ? <Navigate to='/dashboard/home' />
    : children
}
