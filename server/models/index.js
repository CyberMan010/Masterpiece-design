const { Sequelize } = require('sequelize');
const config = require('../config/config.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
});

const Product = require('./product.js')(sequelize);
const Category = require('./category')(sequelize);
const ProductCategory = require('./productCategory')(sequelize);

const models = {
  Product,
  Category,
  ProductCategory
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = {
  sequelize,
  Sequelize,
  ...models
};