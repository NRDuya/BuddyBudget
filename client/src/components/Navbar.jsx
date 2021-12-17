import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const history = useHistory();
    const isLogged = localStorage.getItem("isLogged"); 

    const handleLogout = (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/users/logout', {})
        .then((res) => {
            console.log(res.data);
            if(res.data.success){
                localStorage.setItem("isLogged", false);
                history.push("/login");
            }
            else{
                console.log(res.data);
                window.location.reload(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };


    return (
        <nav>
            <div id='navbar'>
                <Link to='/' className='navbar-logo'>
                    BudGet
                </Link>
                {
                    isLogged ? <button onClick={handleLogout}>Logout</button> : <><Link to='/login'>Login</Link>  <Link to='/signup' className='navbar-logo'>Signup</Link></> 
                }
            </div>
        </nav>
    )
}

export default Navbar;
