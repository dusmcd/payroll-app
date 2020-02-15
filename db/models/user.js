const db = require('../db');
const Sequelize = require('sequelize');

const User = db.define('user', {
  password: {
    type: Sequelize.STRING,
    validate: {
      isNull: false,
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
});

module.exports = User;
