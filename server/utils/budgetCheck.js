const UserModel = require('../models/Users');
const BudgetCheck = {};

BudgetCheck.validCategory = (category) => {
    if (category.length > 60) {
        return false;
    }
    return true;
}

BudgetCheck.validExpense = (expense) => {
    const expense_ = expense.toString();
    if (expense_.length > 13) return false;
    const regexp = /^\d+(\.\d{1,2})?$/;
    return regexp.test(expense_);
}

BudgetCheck.validUserId = (userId) => {
    if(UserModel.userIdExists(userId) || typeof userId !== 'number'){
        return false;
    }
    return true;
}

module.exports = BudgetCheck;
