const db = require('../db');
const Sequelize = require('sequelize');
const crypto = require('crypto');
const encryptPassword = require('../../helper/encrypt');

const User = db.define('user', {
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  salt: {
    type: Sequelize.STRING,
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

User.beforeCreate(user => {
  const salt = crypto.randomBytes(32);
  user.salt = salt.toString('hex');
  user.password = encryptPassword(user.password, salt);
});

User.prototype.isValidPassword = function(password) {
  if (this.password === encryptPassword(password, this.salt)) {
    return true;
  }
  return false;
};

module.exports = User;
