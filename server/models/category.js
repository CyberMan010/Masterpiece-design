  'use strict';
  const { Model } = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
      static associate(models) {
        // Define associations here
        Category.hasMany(models.Product, {
          foreignKey: 'category_id',
          as: 'products'
        });
        
        
      }
    }

    Category.init({
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      image_url: { // Add this new field
        type: DataTypes.STRING,
        allowNull: true, // Can be nullable if image upload is optional
      }
    },
     {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: false
    });

    return Category;
  };