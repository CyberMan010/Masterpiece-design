const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');
const { authenticateToken } = require("../Middleware/authMiddleware");
const upload = require('../config/multerConfig');


router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/',upload.single('image'), categoryController.createCategory);
router.put('/:id', upload.single('image'),categoryController.updateCategory);
router.patch('/:id',upload.single('image'), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);


module.exports = router;
