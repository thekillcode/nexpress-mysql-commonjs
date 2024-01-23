const { StatusCodes } = require('../errors/ApiError');
const { createUser, loginUser } = require('../services/auth.service');
const { generateToken } = require('../services/token.service');

const register = async (req, res, next) => {
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
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const loggedUser = await loginUser({ username, password });
    return res.status(StatusCodes.OK).json({ user: loggedUser });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const forgotPassword = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const confirmOtp = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  confirmOtp,
  resetPassword,
};
