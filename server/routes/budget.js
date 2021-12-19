const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserError = require('../helpers/errors/UserError');

router.post('/saveMain', (req, res, next) => {
    let category = req.body.category;
    let expense = req.body.expense;

    //TODO SERVER SIDE CHECK CATEGORY/COST

    let baseSQL = "INSERT INTO mainBudget (category, expense, created, fk_userid) VALUES (?, ?, now(), ?);"
    db.execute(baseSQL, [category, expense, fk_userid])
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

router.get('/getMain', (req, res, next) => {

    let baseSQL = "SELECT id, category, expense FROM mainBudget WHERE fk_userid=?;"
    db.execute(baseSQL, [fk_userid])
     .then(([results, fields]) => {
        if(results && results.length){
            return res.status(201).json({success: true, message: "Get Main Budget Successful", budget: results});
        }
        else{
            return res.status(200).json({success: true, message: "No Main Budget Data Found", budget: results});
        }
     })
     .catch((err) => {
        return res.status(500).json({success: false, message: "Get Main Budget Failed"});
    })
});

router.post('/editMain', (req, res, next) => {
    let category = req.body.category;
    let expense = req.body.expense;
    let budgetId = req.body.id;

    //TODO SERVER SIDE CHECK CATEGORY/COST

    let baseSQL = "UPDATE mainBudget SET category=?, expense=? WHERE id=?;"
    db.execute(baseSQL, [category, expense, budgetId])
     .then(([results, fields]) => {
        if(results && results.affectedRows){
            return res.status(201).json({success: true, message: "Budget edit successful", redirect: "/"});
        }
        else{
            throw new UserError(
                "Server Error, budget could not be edited",
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

router.delete('/deleteMain', (req, res, next) => {
    let budgetId = req.body.id;

    let baseSQL = "DELETE FROM mainBudget where id=?;";
    db.execute(baseSQL, [budgetId])
     .then(([results, fields]) => {
        if(results && results.affectedRows){
            return res.status(201).json({success: true, message: "Budget deletion successful", redirect: "/"});
        }
        else{
            throw new UserError(
                "Server Error, budget could not be edited",
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