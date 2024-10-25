const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Ensure this route is defined
router.post('/', authenticateToken, orderController.createOrder);

module.exports = router;
