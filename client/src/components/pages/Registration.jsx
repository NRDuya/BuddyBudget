import axios from 'axios';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertComponent from '../AlertComponent';

function Registration(){
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const cpasswordRef = useRef();
    const navigate = useNavigate();

    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('/users/register', {
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                cpassword: cpasswordRef.current.value
            });

            if (res.data.success) {
                navigate('/login');
            } else {
                usernameRef.current.value = '';
                emailRef.current.value = '';
                passwordRef.current.value = '';
                cpasswordRef.current.value = '';
                setAlert(res.data.alert);
            }
        }
        catch (err) {
            const alert = {
                show: true,
                message: "Server error",
                type: 'danger'
            }
            setAlert(alert);
        }
    };

    return(
        <>
            {
                alert.show &&
                <AlertComponent alert={alert} setAlert={setAlert} />
            }
            <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
                <div className="card w-100" style={{ maxWidth: '400px' }}>
                    <div className="card-body">
                        <h3 className="card-header text-center mb-4">
                            Registration
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Username</label>
                                <input className="form-control" type="name" placeholder="Username" ref={usernameRef} required />
                            </div>
                            <div className="form-group mb-3">
                                <label>Email</label>
                                <input className="form-control" type="email" placeholder="Email" ref={emailRef} required />
                            </div>
                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input className="form-control" type="password" placeholder="Password" ref={passwordRef} required />
                            </div>
                            <div className="form-group mb-3">
                                <label>Confirm Password</label>
                                <input className="form-control" type="password" placeholder="Confirm Password" ref={cpasswordRef} required />
                            </div>

                            <button className='btn btn-primary btn-block' type="submit">
                                Submit
                            </button>
                            <p className="forgot-password text-end">
                                Have an account? <Link to='/login'> Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default Registration;