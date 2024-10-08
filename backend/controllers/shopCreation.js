const async_handler = require("express-async-handler");
const Shop = require("../models/shopModel");
const ShopOwner = require("../models/ShopOwnerModel");
const httpStatus = require("http-status");
const shopCreation = async_handler(async (req, res) => {
  const { name, type, address, id, description } = req.body;

  if (!name || !type || !description || !address || !id) {
    return res.status(httpStatus.BAD_REQUEST).json({
      msg: "Please provide all the required fields",
    });
  }

  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }

  const newShop = await Shop.create({
    name,
    type,
    address,
    description,
    image: imageUrl,
  });
  console.log("new shop is now is ", newShop);
  const updatedShopOwner = await ShopOwner.findByIdAndUpdate(
    id,
    { $push: { shop: newShop } },
    { new: true }
  );

  res.status(200).json({
    message: "Shop created successfully",
    updatedShopOwner,
  });
});

module.exports = shopCreation;
