const async_handler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ShopOwner = require("../models/ShopOwnerModel");
const httpStatus = require("http-status");

const shopOwnerAuth = async_handler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // console.log("headers", headers);
      console.log("headers", req.headers);

      token = req.headers.authorization.split(" ")[1]; // Extract the token
      console.log("Token:", token);

      // Decode the JWT token
      //   console.log(process.env.SECRET);
      const decoded = await jwt.verify(token, process.env.SECRET);
      console.log("Decoded ID:", decoded);

      // Find the ShopOwner by the decoded ID
      const user = await ShopOwner.findOne({ _id: decoded.iD });
      console.log(user);
      if (!user) {
        // If the user is not found, return a 404 error
        return res.status(httpStatus.NOT_FOUND).json({
          message: `ShopOwner not found for this ID: ${decoded.iD}`,
        });
      }
      if (!user.shop.length > 0) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: `No shops exists to add a product`,
        });
      }
      console.log(user);

      // If the user is found, attach them to the request object
      req.user = user;
      next(); // Proceed to the next middleware/controller
    } catch (error) {
      // If there's an error during token verification or user lookup
      console.error("Error during token verification or user lookup:", error);

      // Return a 401 error (unauthorized) if token verification fails
      res.status(httpStatus.UNAUTHORIZED).json({
        message: "Not authorized, token failed",
        error: error.message, // Include error message for debugging
      });
    }
  } else {
    // If no authorization header or token is missing, return a 401 error
    res.status(httpStatus.UNAUTHORIZED).json({
      message: "Not authorized, no token found",
    });
  }
});

module.exports = shopOwnerAuth;
