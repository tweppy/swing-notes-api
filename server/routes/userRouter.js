const express = require("express");
const router = express.Router();
const { signUp, login, getAllUsers } = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/signup", signUp);
router.post("/login", login);

// router.get("/account", checkBodyAccount, auth, authUser, userAccount);

module.exports = router;
