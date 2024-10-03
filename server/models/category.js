const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'categories',
    timestamps: false
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Product, {
      through: 'ProductCategory',
      foreignKey: 'category_id',
      otherKey: 'product_id'
    });
  };

  return Category;
};