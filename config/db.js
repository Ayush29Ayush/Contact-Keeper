const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//mongoose returns promises

//! Without async await
const connectDB = () => {
  mongoose
    .connect(db)
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
