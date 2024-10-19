const authController = require('../controllers/userController');
const router = require('express').Router();
const { authenticateToken } = require('../Middleware/authMiddleware');
const upload = require("../config/multerConfig")

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authenticateToken, authController.protected);
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, authController.updateProfile);

module.exports = router;