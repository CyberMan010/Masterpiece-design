const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'product_id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Categories',
        key: 'category_id'
      }
    }
  }, {
    tableName: 'product_categories',
    timestamps: false
  });

  return ProductCategory;
};