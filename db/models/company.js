const db = require('../db');
const Sequelize = require('sequelize');

const Company = db.define('company', {
  name: {
    type: Sequelize.STRING,
    validate: {
      isNull: false,
      notEmpty: true,
    },
  },
  EIN: {
    type: Sequelize.STRING,
    validate: {
      isNull: false,
      notEmpty: true,
    },
  },
  address: {
    type: Sequelize.STRING,
    validate: {
      isNull: false,
      notEmpty: true,
    },
  },
  city: {
    type: Sequelize.STRING,
    validate: {
      isNull: false,
      notEmpty: true,
    },
  },
  state: {
    type: Sequelize.STRING,
    validate: {
      isNull: false,
      notEmpty: true,
      isUppercase: true,
    },
  },
  zipcode: {
    type: Sequelize.STRING,
    validate: {
      isNull: false,
      notEmpty: true,
    },
  },
});

module.exports = Company;
