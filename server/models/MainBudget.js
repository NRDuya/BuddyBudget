var db = require('../config/database');
const MainBudgetModel = {};

MainBudgetModel.get = (type, userId) => {
    const baseSQL = "SELECT id, category, expense FROM mainbudget WHERE type = ? AND user = ?;"
    return db.execute(baseSQL, [type, userId])
        .then(([results, fields]) => {
            if(results && results.length){
                return Promise.resolve(results);
            } else return Promise.resolve(-1);
        })
        .catch((err) => Promise.reject(err))
}

MainBudgetModel.create = (type, category, expense, userId) => {
    const baseSQL = "INSERT INTO mainbudget (type, category, expense, user) VALUES (?, ?, ?, ?);";
    return db.execute(baseSQL, [type, category, expense, userId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(results.insertId);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

MainBudgetModel.edit = (category, expense, budgetId) => {
    const baseSQL = "UPDATE mainbudget SET category = ?, expense = ? WHERE id = ?;"
    return db.execute(baseSQL, [category, expense, budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

MainBudgetModel.delete = (budgetId) => {
    let baseSQL = "DELETE FROM mainbudget where id = ?;";
    return db.execute(baseSQL, [budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            }
            else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

module.exports = MainBudgetModel;