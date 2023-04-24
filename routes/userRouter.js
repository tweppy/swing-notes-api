const express = require("express");
const router = express.Router();

const { userSignup, userLogin } = require("../controllers/userController");
const {
  checkBody,
  checkIfUserExists,
  checkUsername, checkPassword,
} = require("../middleware/usersMiddleware");

router.get("/");

router.post("/signup", checkBody, checkIfUserExists, userSignup);
router.post("/login", checkBody, checkUsername, checkPassword, userLogin);

module.exports = router;

/*
/api/user/signup    POST    -   Skapa konto
/api/user/login	    POST	-   Logga in
*/
