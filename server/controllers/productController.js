const { Product, Category } = require('../models');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({ include: Category });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, { include: Category });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const [updated] = await Product.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedProduct = await Product.findByPk(req.params.id);
        res.json(updatedProduct);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deleted = await Product.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  }
};

module.exports = productController;