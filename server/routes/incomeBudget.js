const express = require('express');
const router = express.Router();
const UserError = require('../helpers/errors/UserError');
const IncomeBudgetModel = require('../models/IncomeBudget');
const authenticateToken = require('../middleware/authenticateToken');

module.exports = router;