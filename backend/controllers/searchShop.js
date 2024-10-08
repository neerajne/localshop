const async_Handler = require("express-async-handler");
const httpStatus = require("http-status");
const Shop = require("../models/shopModel");
const searchShop = async_Handler(async (req, res) => {
  const { searchTerm } = req.query ;
  if(!searchTerm){
    return res.status(404).json({
      msg:"no search term found"
    })
  }
  const result = await Shop.find({
    name: { $regex: new RegExp(`^${searchTerm}`, "im") },
  });
  if (result.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: "no shop found for this search",
    });
  }
  res.send(result);
});
module.exports = searchShop;
