const express = require('express');
const router = express.Router();



router.post('/orders', authMiddleware, orderController.createOrder);
router.get('/orders', authMiddleware, orderController.getUserOrders);
router.get('/orders/:id', authMiddleware, orderController.getOrderById);
router.put('/orders/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);


module.exports = router;
