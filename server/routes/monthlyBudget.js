const express = require('express');
const router = express.Router();
const UserError = require('../helpers/errors/UserError');
const MonthlyBudgetModel = require('../models/MonthlyBudget');
const authenticateToken = require('../middleware/authenticateToken');
const budgetCheck = require('../utils/budgetCheck');

router.get('/', authenticateToken, async (req, res, next) => {
    const user = req.user;
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);

    try {
        if (!budgetCheck.validUserId(user)) {
            throw new UserError("Invalid user id!", 200);
        } else if (!budgetCheck.validMonth(month)) {
            throw new UserError("Invalid month!", 200);
        } else if (!budgetCheck.validYear(year)) {
            throw new UserError("Invalid year!", 200);
        }
        
        const categories = await MonthlyBudgetModel.getAllCategories(user);
        if (categories < 0) {
            throw new UserError("No categories found. Make a category to start budgeting!", 200);
        }

        const results = await MonthlyBudgetModel.get(user, month, year);
        if (results < 0) {
            return res.status(200).json({success: true, message: "No Monthly Budget Data Found", budget: [], categories: categories})
        } else return res.status(201).json({success: true, message: "Get Monthly Budget Successful", budget: results, categories: categories});
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({success: false, message: err.getMessage()});
        } else next(err);
    }
});

router.post('/save', authenticateToken, async (req, res, next) => {
    const category = req.body.category;
    const expense = req.body.expense;
    const user = req.user;

    try {
        if (!budgetCheck.validCategory(category)) {
            throw new UserError("Category too long!", 200);
        } else if (!budgetCheck.validExpense(expense)) {
            throw new UserError("Invalid expense!", 200);
        } else if (!budgetCheck.validUserId(user)) {
            throw new UserError("Invalid user id!", 200);
        }

        const results = await IncomeBudgetModel.create(category, expense, user);
        if (results < 0) {
            throw new UserError("Server Error, income budget could not be created", 500);
        } else return res.status(201).json({success: true, message: "Income budget creation successful"});
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({success: false, message: err.getMessage()});
        } else next(err);
    }

});

router.post('/edit', authenticateToken, async (req, res, next) => {
    let category = req.body.category;
    let expense = req.body.expense;
    let budgetId = req.body.id;

    try {
        if (!budgetCheck.validCategory(category)) {
            throw new UserError("Category too long!", 200);
        } else if (!budgetCheck.validExpense(expense)) {
            throw new UserError("Invalid expense!", 200);
        } else if (!budgetCheck.validMonthlyBudgetId(budgetId)) {
            throw new UserError("Invalid budget id!", 200);
        }

        const results = await IncomeBudgetModel.edit(category, expense, budgetId);
        if (results < 0) {
            throw new UserError("Server Error, income budget could not be edited");
        } else res.status(201).json({success: true, message: "Income budget edit successful"});
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({success: false, message: err.getMessage()});
        } else next(err);
    }
});

router.delete('/delete', authenticateToken, async (req, res, next) => {
    let budgetId = req.body.id;
    
    try {
        if (!budgetCheck.validMonthlyBudgetId(budgetId)) {
            throw new UserError("Invalid budget id!", 200);
        }

        const results = await IncomeBudgetModel.delete(budgetId);
        if (results < 0) {
            throw new UserError("Server Error, income budget could not be deleted");
        } else return res.status(201).json({success: true, message: "Income budget deletion successful"});
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({success: false, message: err.getMessage()});
        } else next(err);
    }
});

module.exports = router;