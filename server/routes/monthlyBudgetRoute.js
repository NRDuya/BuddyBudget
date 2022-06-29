const express = require('express');
const router = express.Router();
const UserError = require('../helpers/errors/UserError');
const Alert = require('../helpers/Alert');
const MonthlyBudgetModel = require('../models/MonthlyBudgetModel');
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
            throw new UserError("No categories found. Make a category to start budgeting!", 500);
        }

        const results = await MonthlyBudgetModel.get(user, month, year);
        if (results < 0) {
            return res.status(200).json({
                success: true, 
                alert: new Alert("No Monthly Budget Data Found", 'success'), 
                budget: [], 
                categories: categories
            })
        } else 
            return res.status(201).json({
                success: true, 
                alert: new Alert("Get Monthly Budget Successful", 'success'), 
                budget: results, 
                categories: categories
            });
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({ success: false, alert: new Alert(err.getMessage(), 'danger') });
        } else next(err);
    }
});

router.post('/save', authenticateToken, async (req, res, next) => {
    const category = req.body.category;
    const expense = req.body.expense;
    const date = req.body.date;
    const comment = req.body.comment;
    const user = req.user;

    try {
        if (!budgetCheck.validCategory(category)) {
            throw new UserError("Category too long!", 200);
        } else if (!budgetCheck.validExpense(expense)) {
            throw new UserError("Invalid expense!", 200);
        } else if (!budgetCheck.validUserId(user)) {
            throw new UserError("Invalid user id!", 200);
        }

        const budgetId = await MonthlyBudgetModel.create(category, expense, date, comment, user);
        if (budgetId < 0) {
            throw new UserError("Server Error, monthly budget could not be created", 500);
        } else return res.status(201).json({ success: true, alert: new Alert("Monthly budget creation successful", 'success'), budgetId: budgetId });
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({ success: false, alert: new Alert(err.getMessage(), 'danger') });
        } else next(err);
    }

});

router.post('/edit', authenticateToken, async (req, res, next) => {
    const category = req.body.category;
    const expense = req.body.expense;
    const date = req.body.date;
    const comment = req.body.comment;
    const budgetId = req.body.id;

    try {
        if (!budgetCheck.validCategory(category)) {
            throw new UserError("Category too long!", 200);
        } else if (!budgetCheck.validExpense(expense)) {
            throw new UserError("Invalid expense!", 200);
        } else if (!budgetCheck.validDate(date)) {
            throw new UserError("Invalid date!", 200);
        } else if (!budgetCheck.validComment(comment)) {
            throw new UserError("Comment too long!", 200);
        } else if (!budgetCheck.validMonthlyBudgetId(budgetId)) {
            throw new UserError("Invalid budget id!", 200);
        } 

        const results = await MonthlyBudgetModel.edit(category, expense, date, comment, budgetId);
        if (results < 0) {
            throw new UserError("Server Error, Monthyl Expense could not be edited");
        } else res.status(201).json({ success: true, alert: new Alert("Monthyl Expense edit successful", 'success') });
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({ success: false, alert: new Alert(err.getMessage(), 'danger') });
        } else next(err);
    }
});

router.delete('/delete', authenticateToken, async (req, res, next) => {
    const budgetId = req.body.id;
    
    try {
        if (!budgetCheck.validMonthlyBudgetId(budgetId)) {
            throw new UserError("Invalid budget id!", 200);
        }

        const results = await MonthlyBudgetModel.delete(budgetId);
        if (results < 0) {
            throw new UserError("Server Error, monthly expense could not be deleted");
        } else return res.status(201).json({ success: true, alert: new Alert("Monthly expense deletion successful", 'success') });
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({ success: false, alert: new Alert(err.getMessage(), 'danger') });
        } else next(err);
    }
});

module.exports = router;