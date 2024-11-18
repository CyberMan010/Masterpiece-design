const authController = require('../controllers/userController');
const router = require('express').Router();
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticateToken, authController.getProfile);
router.get('/all', authenticateToken, authController.getAllUsers);
router.put('/profile', authenticateToken, authController.updateProfile);
router.patch('/profile', authenticateToken, authController.updateProfile);

// Add these new admin routes
router.put('/admin/users/:id', authenticateToken, authorizeRole('admin'), authController.updateUser);
router.delete('/admin/users/:id', authenticateToken, authorizeRole('admin'), authController.deleteUser);

// Add this new route
router.get('/verify', authenticateToken, (req, res) => {
  try {
    // If authenticateToken middleware passes, the token is valid
    res.json({ 
      valid: true, 
      user: {
        userId: req.userId,
        userType: req.userType
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});

module.exports = router;
