import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav>
            <div id='navbar'>
                <Link to='/' className='navbar-logo'>
                    BudGet
                </Link>
                <Link to='/signup' className='navbar-logo'>
                    Signup
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;
