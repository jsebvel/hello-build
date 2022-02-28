import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { HomeScreen } from '../pages/home/HomeScreen';
import { FavRepo } from '../pages/favs/FavRepo';
import { Container } from 'semantic-ui-react';
import { MenuBar } from '../components/MenuBar';

export const DashboardRouter = () => {
    return (
        <div>
            <MenuBar />
            <Routes>
                <Route path='/home' element={<HomeScreen />} />
                <Route path='favs' element={<FavRepo />} />
            </Routes>
        </div>
    )
}
