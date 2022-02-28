import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';


export const MenuBar = () => {

    const { user, logout } = useContext(AuthContext)
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substring(1);
    const [activeItem, setActiveItem] = useState(path);
    const handleActiveItem = (e, { name }) => setActiveItem(name);
    const menuBar = user ? (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item
                name='Home'
                active={activeItem === 'Home'}
                as={Link}
                to="/dashboard/home"
                onClick={handleActiveItem}
            />

            <Menu.Menu position='right'>
                <Menu.Item
                    name='favorites'
                    active={activeItem === 'favorites'}
                    as={Link}
                    to="/dashboard/favs"
                    onClick={handleActiveItem}
                />

                <Menu.Item
                    name='logout'
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleActiveItem}
                as={Link}
                to="/"
            />

            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleActiveItem}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleActiveItem}
                    as={Link}
                    to="/register"
                />
            </Menu.Menu>
        </Menu>
    )

    return (
        menuBar
    )
}