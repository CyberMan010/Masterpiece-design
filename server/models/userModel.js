// userModel.js
'use strict';
const { Model } = require('sequelize');

   // models/userModel.js
     // server/models/userModel.js
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
        default_address: {
          type: DataTypes.STRING,
          allowNull: true
        },
        user_type: {
          type: DataTypes.ENUM('admin', 'user'),
          allowNull: false,
          defaultValue: 'user'
        }
      }, {
        tableName: 'users',
        timestamps: true, // Ensure this is set to true
        underscored: true // This will use created_at and updated_at instead of createdAt and updatedAt
      });
 
      return User;
    };
