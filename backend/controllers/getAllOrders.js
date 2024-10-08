const async_handler = require("express-async-handler");
const User = require("../models/usermodel");
const Order = require("../models/ordermodel");
const httpStatus = require("http-status");

const getAllOrders = async_handler(async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const user = await User.findById(id).populate("orders");
  console.log(user.orders);
  res.status(httpStatus.CREATED).json({
    result: user.orders,
  });
});

module.exports = getAllOrders;
