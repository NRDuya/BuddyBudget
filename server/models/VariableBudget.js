var db = require('../config/database');
const VariableBudgetModel = {};

VariableBudgetModel.create = (category, expense, userId) => {
    const baseSQL = "INSERT INTO variablebudget (category, expense, user) VALUES (?, ?, ?);"
    db.execute(baseSQL, [category, expense, userId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

VariableBudgetModel.get = (userId) => {
    const baseSQL = "SELECT id, category, expense FROM variablebudget WHERE user = ?;"
    return db.execute(baseSQL, [userId])
        .then(([results, fields]) => {
            if(results && results.length){
                return Promise.resolve(results);
            } else return Promise.resolve(-1);
        })
        .catch((err) => Promise.reject(err))
}

VariableBudgetModel.edit = (category, expense, budgetId) => {
    const baseSQL = "UPDATE variablebudget SET category = ?, expense = ? WHERE id = ?;"
    db.execute(baseSQL, [category, expense, budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

VariableBudgetModel.delete = (budgetId) => {
    let baseSQL = "DELETE FROM variablebudget where id = ?;";
    db.execute(baseSQL, [budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            }
            else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

module.exports = VariableBudgetModel;