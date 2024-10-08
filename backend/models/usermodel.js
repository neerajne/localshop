const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new Schema({
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
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }], // References to Orders collection
});

userSchema.pre("save", function (next) {
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
const User = new model("User", userSchema);
module.exports = User;
