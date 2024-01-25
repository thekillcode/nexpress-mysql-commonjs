const jwt = require('jsonwebtoken');
const { ApiError, ReasonPhrases, StatusCodes } = require('../errors/ApiError');

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new ApiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }
    const bearerToken = req.headers.authorization;
    const completeToken = bearerToken.split(' ');
    const tokenKey = completeToken[0];
    const tokenValue = completeToken[1];
    if (tokenKey.toLowerCase() !== 'lord' || !tokenValue)
      throw new ApiError('Invalid Token', StatusCodes.UNAUTHORIZED);
    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, payload) => {
      if (err)
        throw new ApiError(
          ReasonPhrases.UNAUTHORIZED,
          StatusCodes.UNAUTHORIZED
        );
      req.user = payload;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
