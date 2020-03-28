const Sequelize = require('sequelize');
const db = require('../db');

const State = db.define('state', {
  stateAbbreviation: {
    type: Sequelize.STRING,
    validate: {
      isUppercase: true,
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = State;
