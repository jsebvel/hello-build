import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { MenuBar } from '../components/MenuBar';
import { LoginScreen } from '../pages/auth/LoginScreen';
import { RegisterScreen } from '../pages/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div>
            <Routes>
                <Route path='login' element={<LoginScreen />} />
                <Route path='register' element={<RegisterScreen />} />
            </Routes>
        </div>
    )
}
