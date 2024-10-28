const authController = require('../controllers/userController');
const router = require('express').Router();
const { authenticateToken } = require('../middleware/authMiddleware');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticateToken, authController.getProfile);
router.get('/all', authenticateToken, authController.getAllUsers);
router.put('/profile', authenticateToken, authController.updateProfile);
router.patch('/profile', authenticateToken, authController.updateProfile);


module.exports = router;
