import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { LoginScreen } from '../pages/auth/LoginScreen';
import { RegisterScreen } from '../pages/auth/RegisterScreen';
import { FavRepo } from '../pages/favs/FavRepo';
import { HomeScreen } from '../pages/home/HomeScreen';


export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='login' element={<LoginScreen />} />
                    <Route path='register' element={<RegisterScreen />} />
                    <Route path='home' element={<HomeScreen />} />
                    <Route path='favs' element={<FavRepo />} />
                </Routes>
            </div>
        </Router>
    )
}
