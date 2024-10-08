// const httpStatus = require("http-status");
// const User = require("../models/usermodel");
// const async_handler = require("express-async-handler");
// const Order = require("../models/ordermodel");
// const addOrders = async_handler(async (req, res) => {
//   const {
//     id,
//     shopId,
//     products,
//     totalPrice,
//     status,
//     deliveryAddress,
//     deliveryDate,
//   } = req.body;
//   const newOrder = await Order.create({
//     userId: id,
//     shopId: shopId,
//     products: products,
//     totalPrice: totalPrice,
//     status: status,
//     deliveryDate: deliveryDate,
//     deliveryAddress: deliveryAddress,
//   });
//   const user = await User.findById({ _id: id });
//   const updatedUser = await User.findByIdAndUpdate(
//     { _id: id },
//     { $push: { orders: newOrder } },
//     { new: true }
//   );
//   console.log(updatedUser);
//   res.status(httpStatus.CREATED).json({
//     newOrder,
//   });
// });
const addOrders = (req, res) => {
  res.send("Added");
};
module.exports = addOrders;
