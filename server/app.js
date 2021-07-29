const express = require('express');
const cors = require('cors');
const path = require('path');


// IMPORT ROUTERS //
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);



module.exports = app;