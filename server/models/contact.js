const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Contact extends Model {}

  Contact.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Contact',
    tableName: 'Contacts', // Use the exact table name
    timestamps: true,
  });

  return Contact;
};
