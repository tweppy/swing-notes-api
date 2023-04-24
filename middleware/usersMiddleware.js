const { userDB } = require("../models/userModel");

//checkBody
function checkBody(req, res, next) {
  const body = req.body;
  // userDB.remove({}, { multi: true })

  if (body?.username && body?.password) {
    next();
  } else {
    const result = {
      success: false,
      message: "Invalid body input",
      usernameInput: body.hasOwnProperty("username"),
      passwordInput: body.hasOwnProperty("password"),
    };

    res.status(400).json(result);
  }
}

//checkIfUserExists
async function checkIfUserExists(req, res, next) {
  const body = req.body;

  const checkUsername = await userDB.findOne({ username: body.username });

  if (!checkUsername) {
    next();
  } else {
    const result = {
      success: false,
      message: `User '${body.username}' already exists.`,
    };

    res.status(400).json(result);
  }
}

//validateLogin
async function validateLogin(req, res, next) {}

module.exports = { checkBody, checkIfUserExists };
