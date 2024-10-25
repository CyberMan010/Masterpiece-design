const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const productController = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Protected routes
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.patch('/:id', productController.deactivateProduct);

module.exports = router;
