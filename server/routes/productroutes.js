const express = require('express');
const router = express.Router();




router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', authMiddleware, adminMiddleware, productController.createProduct);
router.put('/products/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/products/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;
