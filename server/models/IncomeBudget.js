var db = require('../config/database');
const IncomeBudgetModel = {};

IncomeBudgetModel.create = (category, expense, userId) => {
    const baseSQL = "INSERT INTO incomebudget (category, expense, user) VALUES (?, ?, ?);"
    db.execute(baseSQL, [category, expense, userId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

IncomeBudgetModel.get = (userId) => {
    const baseSQL = "SELECT id, category, expense FROM incomebudget WHERE user = ?;"
    return db.execute(baseSQL, [userId])
        .then(([results, fields]) => {
            if(results && results.length){
                return Promise.resolve(results);
            } else return Promise.resolve(-1);
        })
        .catch((err) => Promise.reject(err))
}

IncomeBudgetModel.edit = (category, expense, budgetId) => {
    const baseSQL = "UPDATE incomebudget SET category = ?, expense = ? WHERE id = ?;"
    db.execute(baseSQL, [category, expense, budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

IncomeBudgetModel.delete = (budgetId) => {
    let baseSQL = "DELETE FROM incomebudget where id = ?;";
    db.execute(baseSQL, [budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            }
            else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

module.exports = IncomeBudgetModel;