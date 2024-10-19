const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const productController = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authMiddleware');



// Public routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', upload.single('image'), productController.createProduct);
router.patch('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;