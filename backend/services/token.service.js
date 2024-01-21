const { sign, verify } = require('../utils/token.utills');

const generateToken = async (payload, expiresIn, secret) => {
  return await sign(payload, expiresIn, secret);
};

const verifyToken = async (token, secret) => {
  return await verify(token, secret);
};

module.exports = { generateToken, verifyToken };
