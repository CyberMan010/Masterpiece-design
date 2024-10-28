const express = require('express');
const router = express.Router(); // Initialize the router first
const customDesignController = require('../controllers/customDesignController');
const { authenticateToken } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();

// Define routes after initializing the router
router.post('/custom-designs', upload.single('picture'), customDesignController.createDesignRequest);
router.get('/custom-designs', authenticateToken, customDesignController.getUserDesigns);
router.get('/custom-designs/:id', authenticateToken, customDesignController.getDesignById);
router.put('/custom-designs/:id', authenticateToken, customDesignController.updateDesign);
router.delete('/custom-designs/:id', authenticateToken, customDesignController.deleteDesign);

module.exports = router;
