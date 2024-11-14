'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CustomDesignRequest = sequelize.define('CustomDesignRequest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    request_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  CustomDesignRequest.associate = (models) => {
    CustomDesignRequest.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return CustomDesignRequest;
};
