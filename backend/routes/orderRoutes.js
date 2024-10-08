const express = require("express");
const addOrders = require("../controllers/addOrders");
const userAuth = require("../middlewares/userAuth");
const getAllOrders = require("../controllers/getAllOrders");

const router = express.Router();
router.route("/add").post(userAuth, addOrders);
router.route("/user/getAllOrders").get(getAllOrders);

module.exports = router;
