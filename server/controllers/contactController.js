// Example structure of contactController.js
const { Contact } = require('../models');
const nodemailer = require('nodemailer');

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Name, email, and message are required' 
      });
    }

    const newContact = await Contact.create({
      name,
      email,
      message
    });

    res.status(201).json({ 
      message: 'Message sent successfully',
      contact: newContact 
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.respondToContact = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error('Email configuration is missing');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Test the connection
    await transporter.verify();

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Response from Roxana Furniture',
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #5d4037;">Response from Roxana Furniture</h2>
          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            ${message}
          </div>
          <p style="color: #777; font-size: 14px;">
            Thank you for contacting Roxana Furniture. If you have any more questions, please don't hesitate to reach out.
          </p>
        </div>
      `
    });

    res.status(200).json({ message: 'Response sent successfully' });
  } catch (error) {
    console.error('Error sending response:', error);
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Failed to send response: ${error.message}`
      : 'Failed to send response. Please try again later.';
    
    res.status(500).json({ message: errorMessage });
  }
};
