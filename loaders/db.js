const mongoose = require("mongoose");

const db = mongoose.connection;

db.once("open", () => {
  console.log(
    "DB Successfully connected on:",
    process.env.MONGO_URI.substring(
      process.env.MONGO_URI.lastIndexOf("/") + 1,
      process.env.MONGO_URI.indexOf("?")
    )
  );
});

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = { connectDB };