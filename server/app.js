require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Import Routes
const usersRouter = require('./routes/usersRoute');
const mainBudgetRouter = require('./routes/MainBudget/mainBudgetRoute')
const variableBudgetRouter = require('./routes/MainBudget/variableBudgetRoute');
const fixedBudgetRouter = require('./routes/MainBudget/fixedBudgetRoute');
const incomeBudgetRouter = require('./routes/MainBudget/incomeBudgetRoute');
const monthlyBudgetRouter = require('./routes/monthlyBudgetRoute');
const summaryBudgetRouter = require('./routes/summaryBudgetRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/users', usersRouter);
app.use('/mainBudget', mainBudgetRouter);
app.use('/variableBudget', variableBudgetRouter);
app.use('/fixedBudget', fixedBudgetRouter);
app.use('/incomeBudget', incomeBudgetRouter);
app.use('/monthlyBudget', monthlyBudgetRouter);
app.use('/summaryBudget', summaryBudgetRouter);

//app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../client/build/index.html')); });
app.use((req, res) => { res.status(404).json({ message: 'Route Not Found' }); });

const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log("Listening on port " + port);
});
module.exports = app;