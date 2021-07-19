import { useState, useEffect } from 'react';

function Registration(){
    return(
        <form method='POST' action='/users/register' enctype="application/x-www-form-urlencoded">
            <div class='form-field'>
                <label>Username</label>
                <input id="username" type="text" placeholder="Username" name="username" required />
            </div>
            <div class='form-field'>
                <label>Email</label>
                <input id="email" type="text" placeholder="Email" name="email" required />
            </div>
            <div class='form-field'>
                <label>Password</label>
                <input id="password" type="text" placeholder="Password" name="password" required />
            </div>
            <div class='form-field'>
                <label>Confirm Password</label>
                <input id="cpassword" type="text" placeholder="Confirm Password" name="cpassword" required />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default Registration;