const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserError = require('../helpers/errors/UserError');
const MainBudgetModel = require('../models/MainBudget');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/saveMain', authenticateToken, async (req, res, next) => {
    const category = req.body.category;
    const expense = req.body.expense;
    const user = req.user;
    //TODO SERVER SIDE CHECK CATEGORY/COST

    try {
        const results = await MainBudgetModel.create(category, expense, user);
        if (results < 0) {
            throw new UserError("Server Error, main budget could not be created", 500);
        } else return res.status(201).json({success: true, message: "Budget creation successful"});
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({success: false, message: err.getMessage()});
        } else next(err);
    }

});

router.get('/getMain', authenticateToken, async (req, res, next) => {
    const userId = req.user;
    try {
        const results = await MainBudgetModel.get(userId);
        if (results < 0) {
            return res.status(200).json({success: true, message: "No Main Budget Data Found", budget: []})
        } else return res.status(201).json({success: true, message: "Get Main Budget Successful", budget: results});
    }
    catch (err) {
        next(err);
    }
});

router.post('/editMain', authenticateToken, async (req, res, next) => {
    let category = req.body.category;
    let expense = req.body.expense;
    let budgetId = req.body.id;
    //TODO SERVER SIDE CHECK CATEGORY/COST

    try {
        const results = await MainBudgetModel.edit(category, expense, budgetId);
        if (results < 0) {
            throw new UserError("Server Error, main budget could not be edited");
        } else res.status(201).json({success: true, message: "Budget edit successful"});
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({success: false, message: err.getMessage()});
        } else next(err);
    }
});

router.delete('/deleteMain', authenticateToken, async (req, res, next) => {
    let budgetId = req.body.id;
    
    try {
        const results = await MainBudgetModel.delete(budgetId);
        if (results < 0) {
            throw new UserError("Server Error, main budget could not be deleted");
        } else return res.status(201).json({success: true, message: "Budget deletion successful"});
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({success: false, message: err.getMessage()});
        }
        else next(err);
    }
});

module.exports = router;