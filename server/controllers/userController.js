const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users: users });
};

const signUp = async (req, res) => {
  const { username, password } = req.body;

  const checkUsername = await User.findOne({ username });

  if (checkUsername) {
    return res.status(401).json({ message: "Username already exists" });
  }

  try {
    const newUser = await User.create({ username, password });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message, message: "Signup failed" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    console.log(token);

    res.status(200).json({
      success: true,
      message: `User ${username} successfully logged in!`,
      token: token,
      userId: user._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message, message: "Login failed" });
  }
};

module.exports = { signUp, login, getAllUsers };
