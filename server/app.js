const express = require('express');

const app = express();

app.get('/api', (req, res, next) => {
    res.json({ message: "Server" });
});

module.exports = app;