const db = require('../db');
const Sequelize = require('sequelize');

const Tax = db.define('tax', {
  jurisdiction: {
    type: Sequelize.STRING,
    validate: {
      isNull: false,
      notEmpty: true,
    },
  },
  taxType: {
    type: Sequelize.STRING,
    validate: {
      isNull: false,
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
