const Sequelize = require('sequelize');
const db = require('../db');

const Associate = db.define('associate', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  socialSecurityNumber: {
    // should not store in plain text!!
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('socialSecurityNumber', '######' + val + '######');
    },
  },
  address1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address2: {
    type: Sequelize.STRING,
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
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  rate: {
    type: Sequelize.FLOAT,
    default: 0.0,
  },
  isHourly: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  associateType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Associate;
