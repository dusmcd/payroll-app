const db = require('../db');
const Sequelize = require('sequelize');

const User = db.define('user', {
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    set(val) {
      this.setDataValue('password', '######' + val + '######');
    },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = User;
