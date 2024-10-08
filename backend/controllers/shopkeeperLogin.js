const httpStatus = require("http-status");
const ShopOwner = require("../models/ShopOwnerModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const loginShopkeeper = async (req, res) => {
  const { email, password } = req.body;

  // Check if email or password is missing
  if (!email || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Either email or password is missing",
    });
  }

  try {
    // Find shopkeeper by email
    const shopkeeper = await ShopOwner.findOne({ email: email });

    // If no shopkeeper is found
    if (!shopkeeper) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Shopkeeper not found for this email",
      });
    }

    // Compare password using bcrypt
    bcrypt.compare(password, shopkeeper.password, (err, result) => {
      if (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message: "Error while verifying password",
          error: err.message,
        });
      }

      // If password doesn't match
      if (!result) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          message: "Incorrect password",
        });
      }

      return res.status(httpStatus.OK).json({
        message: "Login successful",
        data: {
          _id: shopkeeper._id,
          name: shopkeeper.name,
          email: shopkeeper.email,
          shop: shopkeeper.shop,
          role: shopkeeper.role,
          token: generateToken(shopkeeper._id),
        },
      });
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

module.exports = loginShopkeeper;
