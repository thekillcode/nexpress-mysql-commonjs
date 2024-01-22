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
authRouter.post('/register', trimRequest.all, register);
authRouter.post('/login', trimRequest.all, login);
authRouter.post('/logout', trimRequest.all, logout);
authRouter.post('/refresh-token', trimRequest.all, refreshToken);
authRouter.post('/forgot-password', trimRequest.all, forgotPassword);
authRouter.post('/confirm-otp', trimRequest.all, confirmOtp);
authRouter.post('/reset-password', trimRequest.all, resetPassword);

module.exports = authRouter;
