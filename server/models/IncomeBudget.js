var db = require('../config/database');
const IncomeBudgetModel = {};
const type = "inc";

IncomeBudgetModel.create = (category, expense, userId) => {
    const baseSQL = "INSERT INTO mainbudget (type, category, expense, user) VALUES (?, ?, ?, ?);"
    db.execute(baseSQL, [type, category, expense, userId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

IncomeBudgetModel.get = (userId) => {
    const baseSQL = "SELECT id, category, expense FROM mainbudget WHERE user = ? AND type = ?;"
    return db.execute(baseSQL, [userId, type])
        .then(([results, fields]) => {
            if(results && results.length){
                return Promise.resolve(results);
            } else return Promise.resolve(-1);
        })
        .catch((err) => Promise.reject(err))
}

IncomeBudgetModel.edit = (category, expense, budgetId) => {
    const baseSQL = "UPDATE mainbudget SET category = ?, expense = ? WHERE id = ?;"
    db.execute(baseSQL, [category, expense, budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

IncomeBudgetModel.delete = (budgetId) => {
    let baseSQL = "DELETE FROM mainbudget where id = ?;";
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