const async_handler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const User = require("../models/usermodel");

const userAuth = async_handler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(httpStatus.NOT_FOUND).json({
        msg: "token not found",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("DecodedId:", decoded.iD);
    const user = await User.findById({ _id: decoded.iD });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        msg: `user not found for this id ${decoded.iD} `,
      });
    }
    next();
  }
});
module.exports = userAuth;
