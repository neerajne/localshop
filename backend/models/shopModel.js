const { Schema, model } = require("mongoose");
const shopSchema = new Schema({
  name: {
    type: String,
    maxlength: 20,
  },
  type: {
    // Example: "Bookstore", "Bakery", etc.
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    zipcode: String,
    state: String,
  },
  image: {
    type: String, // This will store the path or URL of the uploaded shop image
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }], // References to Products collection
  rating: {
    type: Number,
    default: null,
  },

  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: "ShopOwner",
  // }, // Reference to the user who owns the shop
});

shopSchema;
const Shop = new model("Shop", shopSchema);
module.exports = Shop;

//reviews: [ObjectId], // References to Reviews collection
