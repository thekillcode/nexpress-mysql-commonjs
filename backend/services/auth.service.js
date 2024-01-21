const { ApiError, StatusCodes } = require('../errors/ApiError');

const createUser = async (userData) => {
  const errors = {};
  const { username, email, password, password_confirmation } = userData;

  if (Object.keys(errors).length > 0) {
    throw new ApiError(errors, StatusCodes.BAD_REQUEST);
  }
};

module.exports = { createUser };
