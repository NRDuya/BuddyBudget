const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const mySqlSession = require('express-mysql-session')(session);

// Import Routes
const usersRouter = require('./routes/users');
const budgetRouter = require('./routes/budget');

const app = express();

const mySqlSessionStore = new mySqlSession({/* using default options */}, require('./config/database'));

app.use(session({
    key: "userid",
    secret: 'secret',
    store: mySqlSessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 3600000
    }
}));

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