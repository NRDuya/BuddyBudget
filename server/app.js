require('dotenv').config();
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
//app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.use('/users', usersRouter);
app.use('/budget', budgetRouter);

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../client/build/index.html')); });
app.use((req, res) => { res.status(404).json({ message: 'Route Not Found' }); });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port " + port);
});
module.exports = app;