var db = require('../config/database');
var bcrypt = require('bcrypt');
const UserModel = {};

UserModel.create = (username, password, email) => {
    return bcrypt.hash(password, 15)
        .then((hashedPassword) => {
            const baseSQL = "INSERT INTO users (username, email, password, created) VALUES(?, ?, ?, now());"
            return db.execute(baseSQL, [username, email, hashedPassword]);
        })
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(results.insertId);
            }
            else{
                return Promise.resolve(-1);
            }
        })
        .catch((err) => Promise.reject(err));
}

UserModel.usernameExists = (username) => {
    return db.execute("SELECT * FROM users WHERE username = ?", [username])
        .then(([results, fields]) => {
            return Promise.resolve(!(results && results.length == 0));
        })
        .catch((err) => Promise.reject(err));
}

UserModel.emailExists = (email) => {
    return db.execute("SELECT * FROM users WHERE email = ?", [email])
        .then(([results, fields]) => {
            return Promise.resolve(!(results && results.length == 0));
        })
        .catch((err) => Promise.reject(err));
};

UserModel.userIdExists = (userId) => {
    return db.execute("SELECT * FROM users WHERE id = ?", [userId])
        .then(([results, fields]) => {
            return Promise.resolve(!(results && results.length == 0));
        })
        .catch((err) => Promise.reject(err));
};

UserModel.authenticate = (username, password) => {
    let userId;
    const baseSQL = "SELECT id, username, password FROM users WHERE username = ?;"
    return db.execute(baseSQL, [username])
        .then(([results, fields]) => {
            if(results && results.length == 1){
                userId = results[0].id;
                return bcrypt.compare(password, results[0].password);
            }
            else{
                return Promise.reject(-1);
            }
        })
        .then((passwordsMatch) => {
            if(passwordsMatch){
                return Promise.resolve(userId);
            }
            else{
                return Promise.resolve(-1);
            }
        })
        .catch((err) => Promise.reject(err));
};

module.exports = UserModel;