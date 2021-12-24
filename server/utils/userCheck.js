const UserCheck = {};

UserCheck.isUserValid = (username) => {
    if( username.match(/^[0-9a-zA-Z]+$/) &&
        username.charAt(0).match(/[a-zA-Z]/) &&
        username.length >= 3){
            return true;
        }
    else{
        return false;
    }
}

UserCheck.isEmailValid = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
  
UserCheck.isPasswordSecure = (password) => {
    if( password.match(/[A-Z]/g) &&
        password.match(/[0-9]/g) &&
        password.match(/[^a-zA-Z\d]/g) &&
        password.length >= 8){
            return true;
        }
    else{
        return false;
    }
};
module.exports = UserCheck;