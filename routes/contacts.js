const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Contact = require("../models/Contact");

//! This will be a CRUD route => create,read,update,delete

// @route    GET api/contacts
// @desc.    Get all users contacts
// @access   Private route

router.get("/", auth, async (req, res) => {
  // res.send('Get all contacts');
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error...");
  }
});

// @route    POST api/contacts
// @desc.    Add new contact
// @access   Private route

router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    // res.send("Add contact");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error...")
    }
  }
);

// @route    PUT api/contacts/:id
// @desc.    Update contact
// @access   Private route

router.put("/:id", (req, res) => {
  res.send("Update contact");
});

// @route    DELETE api/contacts/:id
// @desc.    Delete contact
// @access   Private route

router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
