const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/count', authenticateToken, cartController.getCartCount);

module.exports = router;
