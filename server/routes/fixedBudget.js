const express = require('express');
const router = express.Router();
const UserError = require('../helpers/errors/UserError');
const FixedBudgetModel = require('../models/FixedBudget');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', authenticateToken, async (req, res, next) => {
    const userId = req.user;
    return res.status(200).json({success: true, message: "No Main Budget Data Found", budget: []})
    try {
        const results = await VariableBudgetModel.get(userId);
        if (results < 0) {
            return res.status(200).json({success: true, message: "No Main Budget Data Found", budget: []})
        } else return res.status(201).json({success: true, message: "Get Main Budget Successful", budget: results});
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;