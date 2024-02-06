import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navbar.module.scss';

const Navbar = () => {
    // Define your navigation items here
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Films', path: '/films' },
        { name: 'TV', path: '/television' },
        { name: 'Upload2Torv', path: '/p2p' }
        // Add other navigation items if needed
    ];

    return (
        <nav className={css.ContainerBlock}>
            {navItems.map(item => (
                <NavLink
                    to={item.path}
                    key={item.name}
                    className={({ isActive }) => isActive ? css.activeLink : ''}
                >
                    {item.name}
                </NavLink>
            ))}
        </nav>
    );
};

export default Navbar;
