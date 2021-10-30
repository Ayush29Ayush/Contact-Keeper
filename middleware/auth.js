const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //! What is X auth token?
  // 'Authorization: Basic ' means basic authentication, browser/client have to supply the username/password with each request. In case of 'x-auth-token' user has to supply username/password for the first time and server returns a access-token in header field 'x-auth-token'.

  // Get the token from the header
  const token = req.header("x-auth-token");

  // Check if not token i.e token doesn't exists
  if (!token) {
    return res.status(401).json({ msg: "No token , authorization denied..." });
  }

  // If token exists then
  try {
    //get the payload
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid..." });
  }
};
