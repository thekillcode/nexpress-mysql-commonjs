const { ApiError, StatusCodes } = require('../errors/ApiError');

const validator = require('validator');
const User = require('../models/User');

const createUser = async (userData) => {
  const errors = {};
  const { username, email, password, password_confirmation } = userData;

  !username
    ? (errors.username = 'username is required')
    : !validator.isLength(username, { min: 3, max: 10 })
    ? (errors.username = 'username length must be between 3 to 10')
    : null;
  !email
    ? (errors.email = 'email is required')
    : !validator.isEmail(email)
    ? (errors.email = 'please enter valid Email')
    : null;
  !password
    ? (errors.password = 'password is required')
    : !validator.isLength(password, { min: 6, max: 100 })
    ? (errors.password = 'password length must be between 6 to 100 character')
    : !validator.equals(password, password_confirmation)
    ? (errors.password = 'password and confirm password mis-match')
    : null;

  if (Object.keys(errors).length > 0) {
    throw new ApiError(errors, StatusCodes.BAD_REQUEST);
  }

  const dbUser = await User.getSingle({ userame: username, email: email });
  if (dbUser) {
    dbUser.username == username
      ? (errors.username = 'user already exists')
      : null;
    dbUser.email == email ? (errors.email = 'email already exists') : null;
    if (Object.keys(errors).length > 0) {
      throw new ApiError(errors, StatusCodes.BAD_REQUEST);
    }
  }
};

module.exports = { createUser };
