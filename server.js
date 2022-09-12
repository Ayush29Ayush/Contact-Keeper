const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
// trial comment
const app = express();

//! Connect Database
connectDB();

//! Init Middleware
// By doing this one can accept the body data
app.use(express.json());

//! This is the Home Page route
// app.get('/', (req,res)=> res.send('Hello World'))
// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome to the ContactKeeper API..." });
// });

//! Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

//! Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // If someone hits the home page , it will go to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
