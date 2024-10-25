const { Product, Category } = require('../models');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock_quantity, is_custom, category_id } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if the category exists
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Create the new product
    const product = await Product.create({
      name,
      description,
      price,
      stock_quantity,
      is_custom,
      image_url,
      category_id
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category', // Ensure this matches the alias in the model
        attributes: ['name'] // Only include the category name
      }
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
        attributes: ['name'] // Only include the category name
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

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock_quantity, is_custom, category_id } = req.body;
    const image_url = req.file ?  `/uploads/${req.file.filename}` : null;

    // Find the product by ID
    const product = await Product.findByPk(id);
    console.log('Found product:', product); // Log the found product


    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product fields
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock_quantity = stock_quantity;
    product.is_custom = is_custom;
    product.category_id = category_id;

    if (image_url) {
      product.image_url = image_url; // Update the image only if a new one is uploaded
    }

    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product
    await product.destroy();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
