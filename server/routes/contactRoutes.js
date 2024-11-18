const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Define routes
router.post('/', contactController.createContact);
router.get('/', contactController.getAllContacts);
router.post('/respond', contactController.respondToContact);

module.exports = router;
