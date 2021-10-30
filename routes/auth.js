const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const { json } = require("express");

// @route    GET api/auth
// @desc.    Get logged in user
// @access   Private route

router.get("/", auth, async (req, res) => {
  // res.send("Get logged in user");
  try {
    // select('-password') means remove password from the returned data since User.findById will send all the data i.e id and password.
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

// @route    POST api/auth
// @desc.    Auth user & get token
// @access   Public route

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // res.send("Log in user");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //! Finding user by email
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          msg: "Invalid Credentials / No user found with this email...",
        });
      }

      //! If user is found by the email id then, finding user by password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: "Invalid Credentials / No user found with this password...",
        });
      }
      //else
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        // gets the jwtSecret from the default.json file in config directory.
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error...");
    }
  }
);

module.exports = router;
