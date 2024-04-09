// Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [flag, setLog] = useState(localStorage.getItem('LoggedIn'));

    return (
        <nav className="navbar">
            <ul className="left">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/proposal">Proposal</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
            <ul className="right">
                {
                    flag ?
                        (
                            <li>Hello</li>
                        )
                        :
                        (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/signup">Sign up</Link></li>
                            </>
                        )
                }
            </ul>
        </nav>
    );
};

export default Navbar;
