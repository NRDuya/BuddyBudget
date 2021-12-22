var db = require('../config/database');
const MainBudgetModel = {};

MainBudgetModel.create = (category, expense, userId) => {
    const baseSQL = "INSERT INTO mainBudget (category, expense, fk_userid) VALUES (?, ?, ?);"
    db.execute(baseSQL, [category, expense, userId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

MainBudgetModel.get = (userId) => {
    const baseSQL = "SELECT id, category, expense FROM mainBudget WHERE fk_userid = ?;"
    return db.execute(baseSQL, [userId])
        .then(([results, fields]) => {
            if(results && results.length){
                return Promise.resolve(results);
            } else return Promise.resolve(-1);
        })
        .catch((err) => Promise.reject(err))
}

MainBudgetModel.edit = (category, expense, budgetId) => {
    const baseSQL = "UPDATE mainBudget SET category = ?, expense = ? WHERE id = ?;"
    db.execute(baseSQL, [category, expense, budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            } else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

MainBudgetModel.delete = (budgetId) => {
    let baseSQL = "DELETE FROM mainBudget where id = ?;";
    db.execute(baseSQL, [budgetId])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(1);
            }
            else return Promise.reject(-1);
        })
        .catch((err) => Promise.reject(err))
}

module.exports = MainBudgetModel;