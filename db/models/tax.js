const db = require('../db');
const Sequelize = require('sequelize');

const Tax = db.define('tax', {
  taxType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  taxRate: {
    type: Sequelize.DOUBLE,
    validate: {
      isNull: false,
      max: 0.99,
    },
  },
});

module.exports = Tax;
