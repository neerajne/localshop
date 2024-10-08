const express = require("express");
const router = express.Router();
const signUpShopkeeper = require("../controllers/shopkeeperSignUp");
const loginShopkeeper = require("../controllers/shopkeeperLogin");
router.route("/signUp").post(signUpShopkeeper);
router.route("/login").post(loginShopkeeper);
module.exports = router;
