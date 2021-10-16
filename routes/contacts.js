const express = require("express");
const router = express.Router();

//! This will be a CRUD route => create,read,update,delete

// @route    GET api/contacts
// @desc.    Get all users contacts
// @access   Private route

router.get('/', (req, res) => {
    res.send('Get all contacts');
});

// @route    POST api/contacts
// @desc.    Add new contact
// @access   Private route

router.post('/', (req, res) => {
    res.send('Add contact');
});

// @route    PUT api/contacts/:id
// @desc.    Update contact
// @access   Private route

router.put('/:id', (req, res) => {
    res.send('Update contact');
});

// @route    DELETE api/contacts/:id
// @desc.    Delete contact
// @access   Private route

router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});

module.exports = router