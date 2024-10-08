const httpStatus = require("http-status");
const Shop = require("../models/shopModel");
const async_handler = require("express-async-handler");
const getAllShops = async_handler(async (req, res) => {
  const allShops = await Shop.find({});
  res.status(httpStatus.FOUND).json(allShops);
});
module.exports = getAllShops;
