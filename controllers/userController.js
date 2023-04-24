const { addUser, findUser } = require("../models/userModel");
const { hashPassword, comparePassword } = require("../bcrypt");

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
async function userLogin(req, res) {
  const { username } = req.body;

  const result = {
    success: true,
    userIsLoggedIn: true,
    message: `${username} successfully logged in.`,
  };

  res.status(200).json(result);
}

module.exports = { userSignup, userLogin };
