const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const productController = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { Product } = require('../models');

// Public routes
router.get('/', productController.getProducts);
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const product = await Product.findByPk(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/', upload.single('image'), productController.createProduct);
router.patch('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
