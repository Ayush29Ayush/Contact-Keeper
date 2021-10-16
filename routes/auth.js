const express = require("express");
const router = express.Router();

// @route    GET api/auth
// @desc.    Get logged in user
// @access   Private route

router.get('/', (req, res) => {
    res.send('Get logged in user');
});

module.exports = router



// @route    POST api/auth
// @desc.    Auth user & get token
// @access   Public route

router.get('/', (req, res) => {
    res.send('Log in user');
});

module.exports = router