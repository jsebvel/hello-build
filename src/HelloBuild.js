import React from 'react'
import { AuthProvider } from './context/auth'
import { AppRouter } from './routers/AppRouter'
import './App.css';

export const HelloBuild = () => {
    return (
        <div className='form-container'>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </div>
    )
}
