const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const shopOwnerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "shopowner",
  },
  shop: [
    {
      type: Schema.Types.ObjectId,
      ref: "Shop", //  Reference to the Shop model
      // required: true,
    },
  ],
});
shopOwnerSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return console.log(err);
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return console.log(err);
      }
      user.password = hash;
      next();
    });
  });
});
const ShopOwner = model("ShopOwner", shopOwnerSchema);
module.exports = ShopOwner;
