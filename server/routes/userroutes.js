const authController = require('../controllers/userController');
const router = require('express').Router();
const { authenticateToken } = require('../Middleware/authMiddleware');
const upload = require("../config/multerConfig")

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected',  authController.protected);
router.get('/profile',  authController.getProfile);
router.put('/profile',  authController.updateProfile);
router.get('/all', authenticateToken, authController.getAllUsers);
router.post('/create', authenticateToken, authController.createUser);
router.put('/:id', authenticateToken, authController.updateUser);
router.delete('/:id', authenticateToken, authController.deleteUser);

module.exports = router;
