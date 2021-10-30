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
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error...");
    }
  }
);

// @route    PUT api/contacts/:id
// @desc.    Update contact
// @access   Private route

router.put("/:id", auth, async (req, res) => {
  // res.send("Update contact");
  const { name, email, phone, type } = req.body;

  //! Build a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found..." });

    //! Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized..." });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true } // this means that it doesn't exist then just create it
    );

    res.json(contact);
  } catch (err) {
    console.error();
    res.status(500).send("Server Error...");
  }
});

// @route    DELETE api/contacts/:id
// @desc.    Delete contact
// @access   Private route

router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
