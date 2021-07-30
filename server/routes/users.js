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
            .then(([results, fields]) => {
                if(results && results.length == 0){
                    return db.execute("SELECT * FROM users WHERE email=?", [email]);
                }
                else{
                    throw new UserError(
                        "Registration failed: User exists",
                        "/signup",
                        200
                    );
                }
            })
            .then(([results, fields]) => {
                if(results && results.length == 0){
                    return bcrypt.hash(password, 15);
                }
                else{
                    throw new UserError(
                        "Registration failed: Email exists",
                        "/signup",
                        200
                    )
                }
            })
            .then((hashedPassword) => {
                let baseSQL = "INSERT INTO users (username, email, password, created) VALUES(?, ?,?, now());"
                return db.execute(baseSQL, [username, email, hashedPassword]);
            })
            .then(([results, fields]) => {
                if(results && results.affectedRows){
                      return res.status(201).json({success: true, message: "User registration successful", redirect: "/login"});
                }
                else{
                    throw new UserError(
                        "Server Error, user could not be created",
                        "/signup",
                        500);
                }
            })
            .catch((err) => {
                if(err instanceof UserError){
                    return res.status(err.getStatus()).json({success: false, message: err.getMessage(), redirectURL: err.getRedirectURL()});
                }
                else{
                    next(err);
                }
            });
    }
    else{
        res.status(200).json({success: false, message: "Invalid inputs", redirectURL: "/signup"});
    }
});

router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    let userId;
    let baseSQL = "SELECT id, username, password FROM users WHERE username=?;"

    if(isUserValid(username) && isPasswordSecure(password)){
        db.execute(baseSQL, [username])
        .then(([results, fields]) => {
            if(results && results.length == 1){
                userId = results[0].id;
                return bcrypt.compare(password, results[0].password);
            }
            else{
                throw new UserError(
                    "Invalid Username and/or Password",
                    "/login",
                    200
                )
            }
        })
        .then((passwordsMatch) => {
            if(passwordsMatch){
                return res.status(201).json({success: true, message: "User login successful", redirect: "/login", id: userId});
            }
            else{
                throw new UserError(
                    "Invalid Username and/or Password",
                    "/login",
                    200
                )
            }
        })
        .catch((err) => {
            if(err instanceof UserError){
                return res.status(err.getStatus()).json({success: false, message: err.getMessage(), redirectURL: err.getRedirectURL()});
            }
            else{
                next(err);
            }
        })
    }
    else{
        res.status(200).json({success: false, message: "Invalid inputs", redirectURL: "/login"});
    }
});
module.exports = router;