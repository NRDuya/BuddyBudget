import axios from 'axios';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../Navbar';

function Login(){
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;

        try{
            const res = await axios.post('/users/login', {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            });

            if (res.data.success) {
                localStorage.setItem("username", res.data.username);
                navigate("/");
            } else {
                console.log(res.data.message);
                window.location.reload(false);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return(
        <>
            <Navigation />
            <div       
                className="container d-flex align-items-center justify-content-center"
                style={{ minHeight: '100vh' }}
            >
                <div className="card w-100" style={{ maxWidth: '400px' }}>
                    <div className="card-body">
                        <h3 className="card-header text-center mb-4">
                            Login
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Username</label>
                                <input className="form-control" type="text" placeholder="Username" ref={usernameRef} required />
                            </div>
                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input className="form-control" type="text" placeholder="Password" ref={passwordRef} required />
                            </div>

                            <button className='btn btn-primary btn-block' type="submit">
                                Login
                            </button>
                            <p className="forgot-password text-end">
                                Need an account? <Link to='/signup'> Register</Link>
                            </p>

                        </form>
                    </div>
                </div>

            </div>
        </>

    );
}

export default Login;