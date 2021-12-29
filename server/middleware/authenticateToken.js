const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (token == null) return res.status(401).json({success: false, message: 'Unauthorized access. Missing token'});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({success: false, message: 'Unauthorized access. Missing token'});
        req.user = user;
        return next();
    })
}