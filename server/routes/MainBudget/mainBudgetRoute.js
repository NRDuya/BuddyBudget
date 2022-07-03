const express = require('express');
const router = express.Router();
const UserError = require('../../helpers/errors/UserError');
const Alert = require('../../helpers/Alert');
const MainBudgetModel = require('../../models/MainBudgetModel');
const authenticateToken = require('../../middleware/authenticateToken');
const budgetCheck = require('../../utils/budgetCheck')

router.get('/', authenticateToken, async (req, res, next) => {
    const user = req.user;

    try {
        if (!budgetCheck.validUserId(user)) {
            throw new UserError("Invalid user id!", 200);
        } else if (!budgetCheck.validMonth(month)) {
            throw new UserError("Invalid month!", 200);
        } else if (!budgetCheck.validYear(year)) {
            throw new UserError("Invalid year!", 200);
        }
        
        const budgets = await MainBudgetModel.getAllBudgets(user);
        if (budgets < 0) {
            return res.status(200).json({ success: true, alert: new Alert("No Monthly Budget Data Found", 'success'), budgets: [] })
        } else return res.status(200).json({ success: true, alert: new Alert("Get All Budgets Successful", 'success'), budgets: budgets })
    }
    catch (err) {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({ success: false, alert: new Alert(err.getMessage(), 'danger') });
        } else return res.status(500).json({ success: false, alert: new Alert("Server Error", 'danger') });
    }
});

module.exports = router;
