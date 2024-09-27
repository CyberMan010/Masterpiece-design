const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const JWT_SECRET = 'your_jwt_secret';

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, userType: user.user_type }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, user_type: user.user_type } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'name', 'email']
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};





exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is being changed and if it's already in use
    if (email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // Update user
    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({ message: 'Profile updated successfully', user: { id: user.id, name: user.name, email: user.email} });
  } catch (error) {
    console.error('Update profile error:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Error updating profile' });
  }
};





exports.protected = (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId, userType: req.userType });
};