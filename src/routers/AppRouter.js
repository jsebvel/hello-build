import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';


export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='login' element={<LoginScreen />} />
                    <Route path='register' element={<RegisterScreen />} />
                </Routes>
            </div>
        </Router>
    )
}
