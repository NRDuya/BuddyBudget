const ValidationModel = require('../models/Validation');
const BudgetCheck = {};

BudgetCheck.validUserId = async (userId) => {
    if (typeof userId !== 'number' || userId < 0) return false;

    const userIdExists = ValidationModel.userIdExists(userId);
    if(userIdExists) return true;
    
    return false;
}

BudgetCheck.validMainBudgetId = async (budgetId) => {
    if (typeof budgetId !== 'number' || budgetId < 0) return false;

    const mainBudgetIdExists = ValidationModel.mainBudgetIdExists(budgetId);
    if(mainBudgetIdExists) return true;
    
    return false;
}

BudgetCheck.validMonthlyBudgetId = async (budgetId) => {
    if (typeof budgetId !== 'number' || budgetId < 0) return false;

    const monthlyBudgetIdExists = ValidationModel.monthlyBudgetIdExists(budgetId);
    if(monthlyBudgetIdExists) return true;

    return false;
}

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

BudgetCheck.validMonth = (month) => {
    if (month < 0 || month > 12) return false;

    if (typeof month === 'number' && (month.toString().length === 2 || month.toString().length === 1)) {
        return true;
    }
    return false;
}

BudgetCheck.validYear = (year) => {
    if (typeof year === 'number' && year > 0 && year.toString().length === 4) {
        return true;
    }
    return false;  
}

BudgetCheck.validDate = (date_) => {
    const date = new Date(date_);
    return date.getTime() === date.getTime();
}

BudgetCheck.validComment= (comment) => {
    if (comment.length <= 60) {
        return true;
    }
    return false;
}

module.exports = BudgetCheck;
