const db = require('../db');
const Sequelize = require('sequelize');

const Disbursement = db.define('disbursement', {
  grossPay: {
    type: Sequelize.DOUBLE,
    validate: {
      isNull: false,
    },
    set(val) {
      this.setDataValue('grossPay', Number(val.toFixed(2)));
    },
  },
  date: {
    type: Sequelize.DATE,
    validate: {
      isNull: false,
      notEmpty: true,
    },
  },
});

module.exports = Disbursement;
