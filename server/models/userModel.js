// userModel.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_type: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW // Provide a default value
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW // Provide a default value
    }
  }, {
    tableName: 'users',
    timestamps: true // Keep this true to let Sequelize manage these fields
  });

  return User;
};
