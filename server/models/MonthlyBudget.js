var db = require('../config/database');
const MonthlyBudgetModel = {};

MonthlyBudgetModel.get = (userId, month, year) => {
    const baseSQL = "SELECT id, category, expense, date, comment FROM monthlybudget WHERE user = ? AND MONTH(date) = ? AND YEAR(date) = ?;"
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
    db.execute(baseSQL, [category, expense, date, comment, userId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

MonthlyBudgetModel.edit = (category, expense, date, comment, budgetId) => {
    const baseSQL = "UPDATE monthlybudget SET category = ?, expense = ?, date = ?, comment = ? WHERE id = ?;"
    db.execute(baseSQL, [category, expense, date, comment, budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

MonthlyBudgetModel.delete = (budgetId) => {
    let baseSQL = "DELETE FROM monthlybudget where id = ?;";
    db.execute(baseSQL, [budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            }
            else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

module.exports = MonthlyBudgetModel;