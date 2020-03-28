const { State } = require('../db');
const Op = require('sequelize').Op;

async function getStates() {
  const states = await State.findAll({
    where: {
      name: {
        [Op.ne]: 'Federal',
      },
    },
  });
  return states;
}

module.exports = getStates;
