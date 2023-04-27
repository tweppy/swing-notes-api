const express = require("express");
const router = express.Router();
const {
  userSignup,
  userLogin,
  userAccount,
} = require("../controllers/userController");
const {
  checkBody,
  checkIfUserExists,
  checkUsername,
  checkPassword,
  auth,
  authUser,
  checkBodyAccount,
} = require("../middleware/usersMiddleware");

router.post("/signup", checkBody, checkIfUserExists, userSignup);
router.post("/login", checkBody, checkUsername, checkPassword, userLogin);
router.get("/account", checkBodyAccount, auth, authUser, userAccount);

module.exports = router;
