const express = require('express');
const router = express.Router();
const UserError = require('../helpers/errors/UserError');
const Alert = require('../helpers/Alert');
const SummaryBudgetModel = require('../models/SummaryBudgetModel');
const authenticateToken = require('../middleware/authenticateToken');
const budgetCheck = require('../utils/budgetCheck');

router.get('/sum', authenticateToken, async (req, res, next) => {
    const user = req.user;
    const year = parseInt(req.query.year);
    
    try {
        if (!budgetCheck.validUserId(user)) {
            throw new UserError("Invalid user id!", 200);
        } else if (!budgetCheck.validYear(year)) {
            throw new UserError("Invalid year!", 200);
        }
        
        const results = await SummaryBudgetModel.getYearlySum(user, year);
        if (results < 0) {
            return res.status(200).json({ success: true, alert: new Alert("No Expenses found for the year", 'success'), expenses: [] })
        } else 
            return res.status(201).json({ success: true, alert: new Alert("Get Yearly sum Successful", 'success'), expenses: results });
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({ success: false, alert: new Alert(err.getMessage(), 'danger') });
        } else return res.status(500).json({ success: false, alert: new Alert("Server Error", 'danger') });
    }
});

module.exports = router