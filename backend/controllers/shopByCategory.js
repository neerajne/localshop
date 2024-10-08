const async_handler = require("express-async-handler");
const Shop = require("../models/shopModel");
const httpStatus = require("http-status");
const shopByCategory = async_handler(async (req, res) => {
  const { type, city } = req.params;
  console.log("Received params:", { type, city });
  if (!type) {
    return res.status(httpStatus.BAD_REQUEST).json({
      msg: "Type is undefined or not given",
    });
  }
  if (city.trim() === "undefined") {
    const result = await Shop.find({
      type: { $regex: new RegExp(type, "im") },
    });
    res.send(result);
    console.log(city);
  } else {
    const result = await Shop.find({
      type: { $regex: new RegExp(type, "im") },
      "address.city": { $regex: new RegExp(city, "i") },
    });
    res.send(result);
  }
});
module.exports = shopByCategory;
