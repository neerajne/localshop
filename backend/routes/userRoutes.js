const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/userSignUp");
const loginController = require("../controllers/userLogin");
router.route("/signUp").post(signUpController);
router.route("/login").post(loginController);
module.exports = router;
