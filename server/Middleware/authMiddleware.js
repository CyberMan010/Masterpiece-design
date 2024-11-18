const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.userId = user.userId;
    next();
  });
}

function authorizeRole(requiredRole) {
  return (req, res, next) => {
    // Fetch the token and decode it
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }

      if (user.userType !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }

      // User has the required role
      req.userId = user.userId;
      req.userType = user.userType;
      next();
    });
  };
}

module.exports = { authenticateToken, authorizeRole };

