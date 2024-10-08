const async_handler = require("express-async-handler");
const Shop = require("../models/shopModel");

const getProducts = async_handler(async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Shop ID is required" });
  }

  const shop = await Shop.findById(id).populate("products");

  if (!shop) {
    return res.status(404).json({ message: "Shop not found" });
  }

  res.send(shop.products);
});

module.exports = getProducts;
