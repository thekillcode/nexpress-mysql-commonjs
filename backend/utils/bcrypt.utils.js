const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

module.exports = hashPassword;
