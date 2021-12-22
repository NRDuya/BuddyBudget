const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserError = require('../helpers/errors/UserError');
const MainBudgetModel = require('../models/MainBudget');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/saveMain', authenticateToken, (req, res, next) => {
    const category = req.body.category;
    const expense = req.body.expense;
    const user = req.user;
    //TODO SERVER SIDE CHECK CATEGORY/COST


});

router.get('/getMain', authenticateToken, async (req, res, next) => {
    const userId = req.user;
    try {
        const results = await MainBudgetModel.get(userId);
        if (results === -1) {
            return res.status(200).json({success: true, message: "No Main Budget Data Found", budget: []})
        } else return res.status(201).json({success: true, message: "Get Main Budget Successful", budget: results});
    }
    catch (err) {
        next(err);
    }
});

router.post('/editMain', authenticateToken, (req, res, next) => {
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

router.delete('/deleteMain', authenticateToken, (req, res, next) => {
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