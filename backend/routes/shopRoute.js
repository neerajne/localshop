const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const shopCreation = require("../controllers/shopCreation");
const getAllShops = require("../controllers/allShops");
const getShop = require("../controllers/getShop");
const searchShop = require("../controllers/searchShop");
const shopAuth = require("../middlewares/shopAuth");
const shopByCategory = require("../controllers/shopByCategory");
const router = express.Router();
router.route("/search").get(searchShop);
router.route("/create").post(shopAuth, upload.single("image"), shopCreation);
router.route("/all").get(getAllShops);
router.route("/:id").get(shopAuth, getShop);
router.route("/all/:type/:city").get(shopByCategory);

module.exports = router; 
