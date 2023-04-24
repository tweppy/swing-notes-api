const { addUser, findUser } = require("../models/userModel");

//signup
async function userSignup(req, res) {
  const credentials = req.body;

  await addUser(credentials);

  const result = {
    success: true,
    message: `User ${credentials.username} successfully signed up!`,
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
