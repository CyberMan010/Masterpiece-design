const express = require('express');
const router = express.Router(); // Initialize the router first
const customDesignController = require('../controllers/customDesignController');
const { authenticateToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Ensure this path is correct

// Define routes
router.post(
  '/custom-designs',
  authenticateToken,
  upload.single('picture'),
  customDesignController.createDesignRequest
);
router.get('/custom-designs', authenticateToken, customDesignController.getUserDesigns);
router.get('/custom-designs/:id', authenticateToken, customDesignController.getDesignById);
router.put('/custom-designs/:id', authenticateToken, customDesignController.updateDesign);
router.delete('/custom-designs/:id', authenticateToken, customDesignController.deleteDesign);

module.exports = router;
