const express = require("express");
const productCreation = require("../controllers/productCreation");
const getProducts = require("../controllers/getProducts");
const shopAuth = require("../middlewares/shopAuth");
const router = express.Router();
const multer = require("multer");
const shopOwnerAuth = require("../middlewares/shopOwnerAuth");

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Create a unique filename
  },
});

const upload = multer({ storage });

router
  .route("/create")
  .post(shopAuth, shopOwnerAuth, upload.single("image"), productCreation); // Align the "image" field name
router.route("/getProducts/:id").get(getProducts);

module.exports = router;
