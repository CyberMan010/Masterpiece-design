const { Product, Category } = require('../models');

// Get all active products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        is_active: true
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name']
      },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock_quantity, is_custom, category_id } = req.body;
    
    // Validate required fields
    if (!name || !price || !stock_quantity || !category_id) {
      return res.status(400).json({ 
        message: 'Name, price, stock quantity, and category are required' 
      });
    }

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if category exists
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock_quantity,
      is_custom: is_custom === 'true' || is_custom === true,
      image_url,
      category_id,
      is_active: true
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      description, 
      price, 
      stock_quantity, 
      category_id, 
      is_custom, 
      is_active 
    } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Validate required fields
    if (!name || !price || !stock_quantity) {
      return res.status(400).json({ 
        message: 'Name, price, and stock quantity are required' 
      });
    }

    // Prepare update data
    const updateData = {
      name,
      description,
      price,
      stock_quantity,
      category_id,
      is_custom: is_custom === 'true' || is_custom === true,
      is_active: is_active === 'true' || is_active === true
    };

    // Handle image upload if present
    if (req.file) {
      updateData.image_url = '/uploads/' + req.file.filename;
    }

    await product.update(updateData);
    
    // Fetch updated product with category
    const updatedProduct = await Product.findByPk(id, {
      include: {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      message: 'Error updating product', 
      error: error.message 
    });
  }
};

// Soft delete (deactivate) a product
exports.deactivateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update({ is_active: false });
    res.json({ message: 'Product deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating product:', error);
    res.status(500).json({ 
      message: 'Error deactivating product', 
      error: error.message 
    });
  }
};
