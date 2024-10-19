const { Product } = require('../models');
const { Op } = require('sequelize');

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Assuming you have a Product model with a 'name' field
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%` // Use Sequelize's Op.like for partial matching
        }
      }
    });

    res.json(products);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching products' });
  }
};
