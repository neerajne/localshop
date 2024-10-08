// mongodb+srv://neeraj:neeraj@localshop.jfzmu.mongodb.net/localshop

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://neeraj:neeraj@localshop.jfzmu.mongodb.net/localshop"
    );
    console.log("DB connection successful");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

module.exports = connectDB;
