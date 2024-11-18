router.get('/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
}); 