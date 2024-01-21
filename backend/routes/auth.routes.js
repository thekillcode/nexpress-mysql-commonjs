const express = require('express');
const trimRequest = require('trim-request');
const {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  confirmOtp,
  resetPassword,
} = require('../controllers/auth.controller');

const authRouter = new express.Router();
// Add routes
authRouter.get('/register', trimRequest.all, register);
authRouter.get('/login', trimRequest.all, login);
authRouter.get('/logout', trimRequest.all, logout);
authRouter.get('/refresh-token', trimRequest.all, refreshToken);
authRouter.get('/forgot-password', trimRequest.all, forgotPassword);
authRouter.get('/confirm-otp', trimRequest.all, confirmOtp);
authRouter.get('/reset-password', trimRequest.all, resetPassword);

module.exports = authRouter;
