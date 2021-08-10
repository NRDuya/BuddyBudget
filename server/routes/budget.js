const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserError = require('../helpers/errors/UserError');

router.post('/saveMain', (req, res, next) => {
    let category = req.body.category;
    let cost = req.body.cost;
    let fk_userid = req.session.user;

    //TODO SERVER SIDE CHECK CATEGORY/COST

    let baseSQL = "INSERT INTO mainBudget (category, price, created, fk_userid) VALUES (?, ?, now(), ?);"
    db.execute(baseSQL, [category, cost, fk_userid])
     .then(([results, fields]) => {
        if(results && results.affectedRows){
            return res.status(201).json({success: true, message: "Budget creation successful", redirect: "/"});
        }
        else{
            throw new UserError(
                "Server Error, budget could not be created",
                "/",
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
    })
});

module.exports = router;