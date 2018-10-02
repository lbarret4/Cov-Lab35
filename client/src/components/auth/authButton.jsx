import React from 'react';
import { NavLink } from 'react-router-dom';
import { isLoggedIn } from '../../services/user';

const AuthButton = (props) => {
    if (isLoggedIn()) {
        return <NavLink className='nav-link' activeClassName='active' to="/logout">Logout</ NavLink>;
    } else {
        return <NavLink className='nav-link' activeClassName='active' to="/login">Login</ NavLink>;
    }
};

export default AuthButton;