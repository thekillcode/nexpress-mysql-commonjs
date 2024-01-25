const express = require('express');
const mainRouter = require('./main.routes');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const auth = require('../middlewares/auth');

const routes = new express.Router();

routes.use('/', mainRouter);
routes.use('/auth', authRouter);
routes.use('/profile', auth, userRouter);

module.exports = routes;
