const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Import Routes
const usersRouter = require('./routes/users');
const budgetRouter = require('./routes/budget');

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', usersRouter);
app.use('/budget', budgetRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Listening on port " + port);
});
module.exports = app;