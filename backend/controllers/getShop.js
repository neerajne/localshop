const async_handler = require("express-async-handler");
const Shop = require("../models/shopModel");
const httpStatus = require("http-status");
const getShop = async_handler(async (req, res) => {
  const { id } = req.params;
  console.log("recieved id is", id);
  const shop = await Shop.findById({ _id: id });
  res.status(httpStatus.FOUND).json({
    message: `shop found with the id ${id}`,
    result: shop,
  });
});
module.exports = getShop;
