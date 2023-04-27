const { addUser, findUserByID } = require("../models/userModel");

async function userSignup(req, res) {
  const credentials = req.body;

  try {
    await addUser(credentials);
    const result = {
      success: true,
      message: `User ${credentials.username} successfully signed up!`,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function userLogin(req, res) {
  const { username } = req.body;

  try {
    const result = {
      success: true,
      message: `${username} successfully logged in.`,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function userAccount(req, res) {
  const user = await findUserByID(req.id);

  try {
    const result = {
      success: true,
      username: user.username,
      userID: user.userID,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = { userSignup, userLogin, userAccount };
