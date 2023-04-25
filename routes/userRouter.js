const express = require("express");
const router = express.Router();

const { userSignup, userLogin, userAccount } = require("../controllers/userController");
const {
  checkBody,
  checkIfUserExists,
  checkUsername,
  checkPassword,
  auth,
} = require("../middleware/usersMiddleware");

//auth
router.get("/account", auth, userAccount);

router.post("/signup", checkBody, checkIfUserExists, userSignup);
router.post("/login", checkBody, checkUsername, checkPassword, userLogin);

module.exports = router;

/*
/api/user/signup    POST    -   Skapa konto
/api/user/login	    POST	-   Logga in
*/
