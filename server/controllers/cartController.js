const { Cart, CartItem } = require('../models');

exports.getCartCount = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user.id;
    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: CartItem }]
    });

    const count = cart ? cart.CartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;
    res.json({ count });
  } catch (error) {
    console.error('Error fetching cart count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
