const express = require("express");
const router = express.Router();

// @route    GET api/auth
// @desc.    Get logged in user
// @access   Private route

router.get('/', (req, res) => {
    res.send('Get logged in user');
});

module.exports = router