const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//mongoose returns promises

// Write useNewUrlParser: true,useCreateIndex: true,useFindAndModify: false to avoid warnings
//! Without async await
const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
