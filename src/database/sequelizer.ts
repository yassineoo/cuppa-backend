// db.ts
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'cuppa',
  username: 'root',
  password: 'root1234',
});

console.log(sequelize.define);

export default sequelize;
