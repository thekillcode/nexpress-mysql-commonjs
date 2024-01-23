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

  const dbusers = await User.checkExistUser({
    username: username,
    email: email,
  });

  if (dbusers.length > 0) {
    dbusers.forEach((usr) => {
      usr.username == username
        ? (errors.username = 'user already exists')
        : null;
      usr.email == email ? (errors.email = 'email already exists') : null;
    });

    if (Object.keys(errors).length > 0) {
      throw new ApiError(errors, StatusCodes.BAD_REQUEST);
    }
  }
  const newUser = await User.create({
    username,
    email,
    password,
    role: 'user',
  });
  return newUser;
};
const loginUser = async (loginData) => {
  const errors = {};
  const { username, password } = loginData;

  !username ? errors.username == 'username is  required' : null;
  !password ? errors.password == 'password is  required' : null;

  if (Object.keys(errors).length > 0)
    throw new ApiError(errors, StatusCodes.BAD_REQUEST);

  const queryParam = { username: username };
  if (validator.isEmail(username)) {
    queryParam.email = username;
    delete queryParam['username'];
  }
  const getUser = await User.singleQuery(
    `select username,email,role_id,status from users where ${
      Object.keys(queryParam)[0]
    }=?`,
    [Object.values(queryParam)[0]]
  );

  return getUser;
};
module.exports = { createUser, loginUser };
