var db = require('../config/database');
const FixedBudgetModel = {};

FixedBudgetModel.create = (category, expense, userId) => {
    const baseSQL = "INSERT INTO fixedbudget (category, expense, user) VALUES (?, ?, ?);"
    db.execute(baseSQL, [category, expense, userId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

FixedBudgetModel.get = (userId) => {
    const baseSQL = "SELECT id, category, expense FROM fixedbudget WHERE user = ?;"
    return db.execute(baseSQL, [userId])
        .then(([results, fields]) => {
            if(results && results.length){
                return Promise.resolve(results);
            } else return Promise.resolve(-1);
        })
        .catch((err) => Promise.reject(err))
}

FixedBudgetModel.edit = (category, expense, budgetId) => {
    const baseSQL = "UPDATE fixedbudget SET category = ?, expense = ? WHERE id = ?;"
    db.execute(baseSQL, [category, expense, budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

FixedBudgetModel.delete = (budgetId) => {
    let baseSQL = "DELETE FROM fixedbudget where id = ?;";
    db.execute(baseSQL, [budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            }
            else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

module.exports = FixedBudgetModel;