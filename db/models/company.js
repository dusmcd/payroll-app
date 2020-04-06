const db = require('../db');
const Sequelize = require('sequelize');
const crypto = require('crypto');
const encryptEIN = require('../../helper/encrypt');

const Company = db.define('company', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  EIN: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  salt: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUppercase: true,
    },
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Company.beforeCreate(company => {
  const salt = crypto.randomBytes(32);
  company.salt = salt.toString('hex');
  company.EIN = encryptEIN(company.EIN, salt);
});

module.exports = Company;
