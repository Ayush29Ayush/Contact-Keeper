const express = require("express");
const router = express.Router();

// @route    POST api/users
// @desc.    Register a user
// @access   Public route

router.post('/', (req, res) => {
    res.send('Register a user');
});

//! Example to understand the router path , basically it concatenates(adds on/merges them) the base url with the url here
// router.post('/ayush', (req, res) => {
//     res.send('Register a ayush');
// });


module.exports = router