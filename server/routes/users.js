const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcrypt');
const UserError = require('../helpers/errors/UserError');

function isUserValid(username_){
    if( username_.match(/^[0-9a-zA-Z]+$/) &&
        username_.charAt(0).match(/[a-zA-Z]/) &&
        username_.length >= 3){
            return true;
        }
    else{
        return false;
    }
}

function isEmailValid(email_){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email_);
} 
  
function isPasswordSecure (password_){
    if( password_.match(/[A-Z]/g) &&
        password_.match(/[0-9]/g) &&
        password_.match(/[^a-zA-Z\d]/g) &&
        password_.length >= 8){
            return true;
        }
    else{
        return false;
    }
};

router.post('/register', (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.cpassword;

    if(isUserValid(username) && isEmailValid(email) && isPasswordSecure(password) && password === cpassword){
        db.execute("SELECT * FROM users WHERE username=?", [username])
            .then((userExists) => {
                if(!userExists){
                    db.execute("SELECT * FROM email WHERE email=?", [email]);
                }
                else{
                    throw new UserError(
                        "Registration failed: User exists",
                        "/registration",
                        200
                    );
                }
            })
            .then((emailExists) => {
                if(!emailExists){
                    bcrypt.hash(password, 15)
                        .then((hashedPassword) => {
                            let baseSQL = "INSERT INTO users (username, email, password, created) VALUES(?, ?,?, now());"
                            return db.execute(baseSQL, [username, email, hashedPassword]);
                        })
                }
                else{
                    throw new UserError(
                        "Registration failed: Email exists",
                        "/registration",
                        200
                    );
                }
                
            })
            .then((createdUserId) => {
                if(createdUserId < 0){
                    throw new UserError(
                      "Server Error, user could not be created",
                      "/registration",
                      500);
                    }
                    else{
                      console.log("users.js -> User registration successful");
                      res.redirect('/login');
                    }            })
            .catch((err) => {
                if(err instanceof UserError){
                    res.status(err.getStatus);
                    res.redirect(err.getRedirectURL);
                }
                else{
                    next(err);
                }
            });
    }
    else{
        console.log("Invalid inputs");
        res.redirect('/registration');
    }
}

// router.post('/login', (req, res, next) => {
//     next();
// });
);

module.exports = router;