
import { Link } from 'react-router-dom';
import Navbar from "../Navbar";

function Login(){
    return(
        <>
            <Navbar />
            <form method='POST' action='/users/register' enctype="application/x-www-form-urlencoded">
                <div class='form-field'>
                    <label>Username</label>
                    <input id="username" type="text" placeholder="Username" name="username" required />
                </div>
                <div class='form-field'>
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