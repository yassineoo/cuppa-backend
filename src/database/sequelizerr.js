// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
     dialect: 'mysql',
     database: 'cuppa',
     username: 'root',
     password: 'root1234',
});

module.exports = sequelize;
