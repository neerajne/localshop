const { Schema, model } = require("mongoose");
const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  shopId: {
    type: Schema.Types.ObjectId,
    ref: "Shop",
  },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  totalPrice: Number,
  status: {
    type: String,
    default: "pending", // Example: "Pending", "Completed", "Cancelled"
  },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: {
    type: Date,
    default: function () {
      return new Date(Date.now() + 30 * 60 * 1000); // Default to 30 minutes after orderDate
    },
  },
  deliveryAddress: {
    street: String,
    city: String,
    zipcode: String,
    state: String,
    country: String,
  },
});

const Order = new model("Order", orderSchema);
module.exports = Order;
