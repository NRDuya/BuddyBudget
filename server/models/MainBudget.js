var db = require('../config/database');
const MainBudgetModel = {};

MainBudgetModel.create = (category, expense, userId) => {
    let baseSQL = "INSERT INTO mainBudget (category, expense, fk_userid) VALUES (?, ?, ?);"
    db.execute(baseSQL, [category, expense, fk_userid])
     .then(([results, fields]) => {
        if(results && results.affectedRows){
            return res.status(201).json({success: true, message: "Budget creation successful", redirect: "/"});
        }
        else{
            throw new UserError(
                "Server Error, budget could not be created",
                "/",
                500);
        }
     })
     .catch((err) => {
        if(err instanceof UserError){
            return res.status(err.getStatus()).json({success: false, message: err.getMessage(), redirectURL: err.getRedirectURL()});
        }
        else{
            next(err);
        }
    })
}

MainBudgetModel.get = (userId) => {
    const baseSQL = "SELECT id, category, expense FROM mainBudget WHERE fk_userid = ?;"
    return db.execute(baseSQL, [userId])
        .then(([results, fields]) => {
            if(results && results.length){
                return Promise.resolve(results);
            }
            else{
                return Promise.resolve(-1);
            }
        })
        .catch((err) => Promise.reject(err))
}

module.exports = MainBudgetModel;