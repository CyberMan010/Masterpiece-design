'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      // associations can be defined here if needed
    }
  }
  
  ProductCategory.init({
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'product_id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'category_id'
      }
    }
  }, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'product_categories',
    timestamps: false
  });

  return ProductCategory;
};