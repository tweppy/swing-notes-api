const { findUser } = require("../models/userModel");
const { comparePassword } = require("../utils");
const { userErrors } = require("../errorMessages");
const jwt = require("jsonwebtoken");

function checkBody(req, res, next) {
  const { username, password } = req.body;
  const usernameLength = username.length >= 3;
  const passwordLength = password.length >= 3;

  usernameLength && passwordLength
    ? next()
    : res.status(400).json({ error: userErrors.invalidBody });
}

function checkBodyAccount(req, res, next) {
  const { userID } = req.body;

  userID
    ? next()
    : res.status(400).json({ error: userErrors.invalidBodyAccount });
}

async function checkIfUserExists(req, res, next) {
  const { username } = req.body;
  const usernameExists = await findUser(username);

  !usernameExists
    ? next()
    : res.status(409).json({ error: userErrors.usernameTaken });
}

async function checkUsername(req, res, next) {
  const { username } = req.body;
  const validUser = await findUser(username);

  validUser
    ? next()
    : res.status(404).json({ error: userErrors.usernameNotFound });
}

async function checkPassword(req, res, next) {
  const { username, password } = req.body;
  const user = await findUser(username);
  const correctPassword = await comparePassword(password, user.password);

  if (correctPassword) {
    const token = jwt.sign({ userID: user.userID }, "4815162342", {
      expiresIn: 3600, // 1 hour
    });
    console.log("token: ", token);

    next();
  } else {
    res.status(401).json({ error: userErrors.incorrectPassword });
  }
}

async function auth(req, res, next) {
  const token = req.headers?.authorization.replace("Bearer ", "");

  try {
    const data = jwt.verify(token, "4815162342");
    req.id = data.userID;

    next();
  } catch (error) {
    res.status(498).json({ error: userErrors.invalidToken });
  }
}

//so a user cannot access another user's note
async function authUser(req, res, next) {
  const { userID } = req.body;

  userID === req.id
    ? next()
    : res.status(403).json({ error: userErrors.unauthorizedUser });
}

module.exports = {
  checkBody,
  checkIfUserExists,
  checkUsername,
  checkPassword,
  auth,
  authUser,
  checkBodyAccount,
};
