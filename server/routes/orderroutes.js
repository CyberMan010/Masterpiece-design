const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Ensure this route is defined
router.post('/', authenticateToken, orderController.createOrder);

// Fetch orders for the authenticated user
router.get('/user', authenticateToken, orderController.getUserOrders);

module.exports = router;
