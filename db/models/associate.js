const Sequelize = require('sequelize');
const db = require('../db');

const Associate = db.define('associate', {
  firstName: {
    type: Sequelize.STRING,
    validate: {
      isNull: false,
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      isNull: false,
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
    validate: {
      isNull: false,
      notEmpty: true,
    },
  },
  address2: {
    type: Sequelize.STRING,
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
    validate: {
      isNull: false,
      notEmpty: true,
    },
  },
  associateType: {
    type: Sequelize.STRING,
    validate: {
      isNull: false,
      notEmpty: true,
    },
  },
});

module.exports = Associate;
