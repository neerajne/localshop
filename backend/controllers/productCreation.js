const async_handler = require("express-async-handler");
const Shop = require("../models/shopModel");
const httpStatus = require("http-status");
const ShopOwner = require("../models/ShopOwnerModel");
const Product = require("../models/productmodel");

const productCreation = async_handler(async (req, res) => {
  console.log("Reached product creation");

  const { id, name, description, price, category, subcategory, stockQuantity } =
    req.body;

  const shopOwnerFound = await ShopOwner.findById({ _id: id }).populate({
    path: "shop",
    populate: {
      path: "products",
    },
  });
  if (!shopOwnerFound) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: "no shop owner found for this id !",
    });
  }

  // Store image path in the same format as shop route
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Create relative path for the image

  const newProduct = await Product.create({
    name,
    description,
    price,
    category,
    subcategory,
    stockQuantity,
    imageUrl, // Use the same image handling method
  });

  res.status(200).json({
    message: "New product created",
    data: newProduct,
  });

  const { _id } =
    shopOwnerFound.shop[0] || "no shop registered for this shopowner";
  const updatedShop = await Shop.findByIdAndUpdate(
    _id,
    { $push: { products: newProduct } },
    { new: true }
  );
  console.log(updatedShop);
});

module.exports = productCreation;
