'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CustomDesignRequest extends Model {}

  CustomDesignRequest.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture: {
      type: DataTypes.BLOB('long'),
      allowNull: false
    },
    request_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'CustomDesignRequest',
    tableName: 'custom_design_requests',
    timestamps: false
  });

  return CustomDesignRequest;
};
