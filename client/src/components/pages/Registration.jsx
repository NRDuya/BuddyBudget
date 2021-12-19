import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';

function Registration(){
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const cpasswordRef = useRef();
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handlesub");
        axios.post('/users/register', {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            cpassword: cpasswordRef.current.value
        })
        .then((res) => {
            if(res.data.success){
                history.push("/login");
                console.log("success");
            }
            else{
                console.log("fail");
                window.location.reload(false);
            }
        })
        .catch((err) => {
            console.log("Axios error" + err);
        });
        console.log("handlesub2");
    };

    return(
        <>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <div className='form-field'>
                    <label>Username</label>
                    <input id="username" type="name" placeholder="Username" ref={usernameRef} required />
                </div>
                <div className='form-field'>
                    <label>Email</label>
                    <input id="email" type="email" placeholder="Email" ref={emailRef} required />
                </div>
                <div className='form-field'>
                    <label>Password</label>
                    <input id="password" type="password" placeholder="Password" ref={passwordRef} required />
                </div>
                <div className='form-field'>
                    <label>Confirm Password</label>
                    <input id="cpassword" type="password" placeholder="Confirm Password" ref={cpasswordRef} required />
                </div>

                <div>
                    <Link to='/login'>
                        Have An Account?
                    </Link>
                </div>
                <button type="submit">Submit</button>

            </form>
        </>
        
    );
}

export default Registration;