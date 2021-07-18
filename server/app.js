const express = require('express');

// IMPORT ROUTERS //
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);



module.exports = app;