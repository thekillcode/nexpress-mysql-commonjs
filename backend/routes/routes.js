const express = require('express');
const mainRouter = require('./main.routes');
const authRouter = require('./auth.routes');

const routes = new express.Router();

routes.use('/', mainRouter);
routes.use('/auth', authRouter);

module.exports = routes;
