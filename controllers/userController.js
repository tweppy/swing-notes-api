const { addUser } = require("../models/userModel");
const { hashPassword } = require("../bcrypt");

//signup
async function userSignup(req, res) {
  const { username, password } = req.body;

  //hash pwd bcrypt
  const pwd = await hashPassword(password);

  await addUser(username, pwd);

  const result = {
    success: true,
    message: `User ${username} successfully signed up!`,
  };

  res.status(200).json(result);
}

//login

module.exports = { userSignup };
