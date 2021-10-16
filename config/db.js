const mongoose = require("mongoose");
const config = require("config");
// const db = config.get("mongoURI");
require("dotenv").config()

//mongoose returns promises

//! Without async await
const connectDB = () => {
  mongoose
    // .connect(db)
    .connect(process.env.mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;

//! With async await 
// const connectDB = async () => {
//     try{
//         await mongoose.connect(db);
//         console.log('MongoDB connected...');
//     } catch (err){
//         console.error(err.message);
//         process.exit(1);
//     }
// };
 
// module.exports = connectDB;
