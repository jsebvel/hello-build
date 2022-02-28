import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { LoginScreen } from '../pages/auth/LoginScreen';
import { RegisterScreen } from '../pages/auth/RegisterScreen';
import { FavRepo } from '../pages/favs/FavRepo';
import { HomeScreen } from '../pages/home/HomeScreen';
import { AuthRouter } from './AuthRouter';
import { DashboardRouter } from './DashboardRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRouter } from './PublicRouter';


export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='auth/*' element={
                        <PublicRouter>
                            <AuthRouter />
                        </PublicRouter>
                    } />
                    <Route path='*' element={
                        <LoginScreen />
                    } />

                    <Route path='dashboard/*' element={
                        <PrivateRoute>
                            <DashboardRouter />
                        </PrivateRoute>
                    } />

                </Routes>
            </div>
        </Router>
    )
}
