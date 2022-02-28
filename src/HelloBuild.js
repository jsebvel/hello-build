import React from 'react'
import { AuthProvider } from './context/auth'
import { AppRouter } from './routers/AppRouter'
import './App.css';

export const HelloBuild = () => {
    return (
        <div>
            <h3>Hello Build!!!</h3>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </div>
    )
}
