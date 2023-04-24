const { addUser } = require("../models/userModel");

//signup
async function userSignup(req, res) {
  const { username, password } = req.body;

  await addUser({ username, password });

  const result = {
    success: true,
    message: `User ${username} successfully signed up!`,
  };

  res.status(200).json(result);
}

//login

module.exports = { userSignup };
