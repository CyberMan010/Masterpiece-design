
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Roxana', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = { sequelize };
