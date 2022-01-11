var db = require('../config/database');
const MonthlyBudgetModel = {};

MonthlyBudgetModel.get = (userId, month, year) => {
    const baseSQL = "SELECT budget.id, budget.category AS 'category', cat.category AS 'categoryName', " + 
                        "budget.expense, budget.date, budget.comment FROM monthlybudget budget " +
                        "JOIN mainbudget cat ON budget.category = cat.id " +
                        "WHERE budget.user = ? AND MONTH(budget.date) = ? AND YEAR(budget.date) = ? " +
                        "ORDER BY budget.date DESC;";
    return db.execute(baseSQL, [userId, month, year])
        .then(([results, fields]) => {
            if(results && results.length){
                return Promise.resolve(results);
            } else return Promise.resolve(-1);
        })
        .catch((err) => Promise.reject(err))
}

MonthlyBudgetModel.getAllCategories = (userId) => {
    const baseSQL = "SELECT id, category, type, expense FROM mainbudget WHERE user = ?;"
    return db.execute(baseSQL, [userId])
        .then(([results, fields]) => {
            if(results && results.length){
                return Promise.resolve(results);
            } else return Promise.resolve(-1);
        })
        .catch((err) => Promise.reject(err))
}

MonthlyBudgetModel.create = (category, expense, date, comment, userId) => {
    const baseSQL = "INSERT INTO monthlybudget (category, expense, date, comment, user) VALUES (?, ?, ?, ?, ?);"
    return db.execute(baseSQL, [category, expense, date, comment, userId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(results.insertId);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

MonthlyBudgetModel.edit = (category, expense, date, comment, budgetId) => {
    const baseSQL = "UPDATE monthlybudget SET category = ?, expense = ?, date = ?, comment = ? WHERE id = ?;"
    return db.execute(baseSQL, [category, expense, date, comment, budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

MonthlyBudgetModel.delete = (budgetId) => {
    let baseSQL = "DELETE FROM monthlybudget where id = ?;";
    return db.execute(baseSQL, [budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

module.exports = MonthlyBudgetModel;