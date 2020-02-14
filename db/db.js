const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/my_payroll', {
  logging: false,
});

module.exports = db;
