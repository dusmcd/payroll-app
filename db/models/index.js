const Associate = require('./associate');
const User = require('./user');
const Company = require('./company');
const Tax = require('./tax');
const Disbursement = require('./disbursement');
const State = require('./state');
const Sequelize = require('sequelize');
const db = require('../db');

/*
  create data associations here, i.e., FK, one-to-many
*/
const TaxesPayable = db.define('taxesPayable', {
  employerPortion: {
    type: Sequelize.DOUBLE,
    validate: {
      isNull: false,
    },
  },
  employeePortion: {
    type: Sequelize.DOUBLE,
    validate: {
      isNull: false,
    },
  },
});

Associate.hasOne(User);
Company.hasMany(Associate);
Associate.hasMany(Disbursement);
Tax.belongsToMany(Disbursement, { through: 'taxesPayable' });
Disbursement.belongsToMany(Tax, { through: 'taxesPayable' });
State.hasOne(Tax);

module.exports = {
  Associate,
  User,
  Company,
  Tax,
  Disbursement,
  TaxesPayable,
  State,
};
