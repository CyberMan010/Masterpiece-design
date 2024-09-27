const express = require('express');
const router = express.Router();


router.get('/categories', categoryController.getAllCategories);
router.post('/categories', authMiddleware, adminMiddleware, categoryController.createCategory);
router.put('/categories/:id', authMiddleware, adminMiddleware, categoryController.updateCategory);
router.delete('/categories/:id', authMiddleware, adminMiddleware, categoryController.deleteCategory);


module.exports = router;
