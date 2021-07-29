import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login(){

    return(
        <>
            <form method='POST' action='/users/register' enctype="application/x-www-form-urlencoded">
                <div className='form-field'>
                    <label>Username</label>
                    <input id="username" type="text" placeholder="Username" name="username" required />
                </div>
                <div className='form-field'>
                    <label>Password</label>
                    <input id="password" type="text" placeholder="Password" name="password" required />
                </div>

                <div id='login-options'>
                    <Link to='/signup'>
                        Register
                    </Link>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>

    );
}

export default Login;