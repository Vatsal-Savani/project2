const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  const hashedPass = await bcrypt.hash(password, saltRounds);

  return hashedPass;
};

const verifyPassword = async (password, hashedPassword) => {
  const isEmployee = await bcrypt.compare(password, hashedPassword);

  return isEmployee;
};

module.exports = { hashPassword, verifyPassword };
