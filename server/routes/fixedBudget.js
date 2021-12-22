const express = require('express');
const router = express.Router();
const UserError = require('../helpers/errors/UserError');
const FixedBudgetModel = require('../models/FixedBudget');
const authenticateToken = require('../middleware/authenticateToken');

module.exports = router;