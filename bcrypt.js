const bcrypt = require("bcryptjs");

//hash pwd
async function hashPassword(password) {
  const hashedPwd = await bcrypt.hash(password, 10);

  return hashedPwd;
}

//compare pwd
async function comparePassword(password, hashedPwd) {
  const isMatch = await bcrypt.compare(password, hashedPwd);

  return isMatch;
}

module.exports = { hashPassword, comparePassword };
