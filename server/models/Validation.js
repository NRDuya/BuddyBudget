var db = require('../config/database');
const ValidationModel = {};

ValidationModel.userIdExists = (userId) => {
    return db.execute("SELECT * FROM users WHERE id = ?", [userId])
        .then(([results, fields]) => {
            return Promise.resolve(!(results && results.length == 0));
        })
        .catch((err) => Promise.reject(err));
};

ValidationModel.mainBudgetIdExists = (budgetId) => {
    return db.execute("SELECT * FROM mainbudget WHERE id = ?", [budgetId])
    .then(([results, fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
}

module.exports = ValidationModel;