const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

// @route    POST api/users
// @desc.    Register a user
// @access   Public route

// router.post('/', (req, res) => {
//     res.send(req.body);
// });

router.post(
  "/",
  [
    //! This is the validation part
    check("name", "Please add a Name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    // res.send(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // this will send 400 status with array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    res.status(200).send("Passed , no errors")
  }
);

//! Example to understand the router path , basically it concatenates(adds on/merges them) the base url with the url here
// router.post('/ayush', (req, res) => {
//     res.send('Register a ayush');
// });

module.exports = router;
