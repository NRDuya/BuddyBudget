import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const isLogged = localStorage.getItem('username');

    const handleLogout = async (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        try {
            const res = await axios.post('/users/logout', {});
            if (res.data.success) {
                navigate('/login');
            } else {
                window.location.reload(false);
            }
        }
        catch (err) {
            console.log(err);
        }
        localStorage.removeItem("username");
    };

    return (
        <nav>
            <div id='navbar'>
                <Link to='/' className='navbar-logo'>
                    BudGet
                </Link>
                {
                    isLogged ? (<button onClick={handleLogout}>Logout</button>) : (<><Link to='/login'>Login</Link>  <Link to='/signup' className='navbar-logo'>Signup</Link></>) 
                }
            </div>
        </nav>
    )
}

export default Navbar;
