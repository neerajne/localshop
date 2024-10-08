const httpStatus = require("http-status");
const User = require("../models/usermodel");
const async_handler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const signUp = async_handler(async (req, res) => {
  const { name, email, password, address, phone } = req.body;
  if (!name || !email || !password || !address || !phone) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "plz fill all the fields",
    });
  }
  console.log(name, email);
  const findUser = await User.findOne({ email });
  if (findUser) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "User already exists !!",
    });
  }
  const newUser = await User.create({ name, email, password, address, phone });
  res.status(httpStatus.CREATED).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    address: newUser.address,
    phone: newUser.phone,
    role: newUser.role,
    token: generateToken(newUser._id),
  });
});
module.exports = signUp;
