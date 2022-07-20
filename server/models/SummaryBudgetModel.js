var db = require('../config/database');
const SummaryBudgetModel = {};

SummaryBudgetModel.getYearlySum = (userId, year) => {
    const baseSQL = "SELECT SUM(e.expense) total, MONTH(e.date) month, b.type FROM monthlybudget e " + 
                        "JOIN mainbudget b ON b.id = e.category WHERE e.user = ? AND YEAR(e.date) = ? " + 
                        "GROUP BY MONTH(date), type ORDER BY month;" 
    return db.execute(baseSQL, [userId, year])
        .then(([results, fields]) => {
            if(results && results.length){
                return Promise.resolve(results);
            } else return Promise.resolve(-1);
        })
        .catch((err) => Promise.reject(err))
}

SummaryBudgetModel.getYearlyExpenses = (userId, year) => {
    const baseSQL = "SELECT e.category, MONTH(e.date) month, SUM(e.expense) total FROM monthlybudget e " +
	                    "JOIN mainbudget b ON b.id = e.category " +
	                    "WHERE e.user = ? AND YEAR(e.date) = ? " +
                        "GROUP BY e.category, MONTH(e.date);"
    return db.execute(baseSQL, [userId, year])
        .then(([results, fields]) => {
            if(results && results.length){
                return Promise.resolve(results);
            } else return Promise.resolve(-1);
        })
        .catch((err) => Promise.reject(err))
}

module.exports = SummaryBudgetModel;