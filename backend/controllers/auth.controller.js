import { StatusCodes } from '../errors/ApiError';
import { createUser } from '../services/auth.service';
import { generateToken } from '../services/token.service';

const validator = require('validator');
export const register = async (req, res, next) => {
  try {
    const { username, email, password, password_confirmation } = req.body;
    const newUser = await createUser({
      username,
      email,
      password,
      password_confirmation,
    });
    const token = await generateToken(
      { userId: newUser.id },
      '1d',
      process.env.JWT_SECRET
    );
    const refresh_token = await generateToken(
      { userId: newUser.id },
      '30d',
      process.env.JWT_REFRESH_SECRET
    );
    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      path: '/api/v1/auth/refresh-token',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ access_token: token, user: newUser });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const forgotPassword = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const confirmOtp = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
