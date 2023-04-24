const { findUser } = require("../models/userModel");
const { comparePassword } = require("../bcrypt");
const jwt = require("jsonwebtoken");

const result = {
  success: false,
};

//checkBody
function checkBody(req, res, next) {
  const body = req.body;
  // userDB.remove({}, { multi: true })

  if (body?.username && body?.password) {
    next();
  } else {
    result.message = "Invalid body input. Please enter a valid username and password.";
    result.usernameInput = body.hasOwnProperty("username");
    result.passwordInput = body.hasOwnProperty("password");

    res.status(400).json(result);
  }
}

//checkIfUserExists
async function checkIfUserExists(req, res, next) {
  const { username } = req.body;

  const user = await findUser(username);

  if (!user) {
    next();
  } else {
    result.message = `User '${username}' already exists.`;

    res.status(400).json(result);
  }
}

//check username
async function checkUsername(req, res, next) {
  const { username } = req.body;

  const user = await findUser(username);

  if (user) {
    next();
  } else {
    result.message = `User '${username}' not found.`;

    res.status(404).json(result);
  }
}

//check pwd
async function checkPassword(req, res, next) {
  const { username, password } = req.body;
  const user = await findUser(username);

  const correctPassword = await comparePassword(password, user.password);

  if (correctPassword) {
    next();
  } else {
    result.message = "Incorrect password.";

    res.status(400).json(result);
  }
}


module.exports = { checkBody, checkIfUserExists, checkUsername, checkPassword };
