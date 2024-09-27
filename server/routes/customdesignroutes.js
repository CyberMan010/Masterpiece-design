const express = require('express');
const router = express.Router();


router.post('/custom-designs', authMiddleware, customDesignController.createDesign);
router.get('/custom-designs', authMiddleware, customDesignController.getUserDesigns);
router.get('/custom-designs/:id', authMiddleware, customDesignController.getDesignById);
router.put('/custom-designs/:id', authMiddleware, customDesignController.updateDesign);
router.delete('/custom-designs/:id', authMiddleware, customDesignController.deleteDesign);


module.exports = router;
