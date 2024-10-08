const asyncHandler = require("express-async-handler");
const shopOwner = require("../models/ShopOwnerModel");
const generateToken = require("../utils/generateToken");
const httpStatus = require("http-status");
const ShopOwner = require("../models/ShopOwnerModel");
const signUpShopkeeper = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.send("Fill all the fields");
  }
  console.log(name, email, password, phone);
  const shopkeeper = await ShopOwner.findOne({ email: email });
  if(shopkeeper){
    return res.status(404).json({
      msg:"email already exists "
    })
  }
  const newShopOwner = await shopOwner.create({
    name,
    email,
    password,
    phone,
  });
  res.status(httpStatus.CREATED).json({
    name,
    email,
    phone,
    role: newShopOwner.role,
    _id: newShopOwner._id,
    token: generateToken(newShopOwner._id),
  });
});
module.exports = signUpShopkeeper;
