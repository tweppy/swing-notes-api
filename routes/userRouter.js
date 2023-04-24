const express = require("express");
const router = express.Router();

const { userSignup } = require("../controllers/userController");
const { checkBody, checkIfUserExists } = require("../middleware/usersMiddleware");

router.get("/");

router.post("/signup", checkBody, checkIfUserExists, userSignup);
router.post("/login", checkBody);

module.exports = router;

/*
/api/user/signup    POST    -   Skapa konto
/api/user/login	    POST	-   Logga in
*/
