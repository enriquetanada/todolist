const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const toDoListRouter = require('./routes/toDoListRoute');

const app = express();

app.use(express.json());

//Routes

app.use('/api/v1/lists', toDoListRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler);

module.exports = app;