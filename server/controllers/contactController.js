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
