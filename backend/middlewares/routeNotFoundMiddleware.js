const { ApiError, StatusCodes } = require('../errors/ApiError');

const routeNotFoundMiddleware = (req, res, next) => {
  next(new ApiError('This Route Does Not Exist', StatusCodes.NOT_FOUND));
};

module.exports = routeNotFoundMiddleware;
