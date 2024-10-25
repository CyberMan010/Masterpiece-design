// Example structure of contactController.js
const { Contact } = require('../models');

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = await Contact.create({ name, email, message });
    res.status(201).json({ message: 'Contact created successfully', contact: newContact });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
