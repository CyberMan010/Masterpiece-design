'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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
    picture: {
      type: DataTypes.BLOB,
      allowNull: false
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
