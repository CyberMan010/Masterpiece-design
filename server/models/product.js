'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    image_url: DataTypes.STRING,
    is_custom: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'category_id'
      }
    }
  }, {
    tableName: 'products',
    timestamps: true
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });  };

  return Product;
};