const express = require("express");
const router = express.Router();

const { userSignup } = require("../controllers/userController");
//req mws

router.get("/");

router.post("/signup", userSignup);
router.post("/login");

module.exports = router;

/*
/api/user/signup    POST    -   Skapa konto
/api/user/login	    POST	-   Logga in
*/
