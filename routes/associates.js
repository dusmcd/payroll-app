const router = require('express').Router();
const { State, Associate } = require('../db/models');
const Op = require('sequelize').Op;

router.get('/new', async (req, res, next) => {
  try {
    const states = await State.findAll({
      where: {
        name: {
          [Op.ne]: 'Federal',
        },
      },
    });
    res.render('associates/new', {
      action: 'Submit',
      states,
      url: '/associates',
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const isHourly = Object.prototype.hasOwnProperty.call(req.body, 'isHourly');
    const newAssociateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      socialSecurityNumber: req.body.ssn,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      email: req.body.email,
      rate: req.body.rate,
      associateType: req.body.type,
      companyId: 1,
      isHourly,
    };
    const newAssociate = await Associate.create(newAssociateData);
    res.redirect(`/associates/${newAssociate.id}`);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const associate = await Associate.findByPk(req.params.id);
    res.json(associate);
  } catch (err) {
    next(err);
  }
});

router.get('/edit/:id', async (req, res, next) => {
  try {
    const states = await State.findAll({
      where: {
        name: {
          [Op.ne]: 'Federal',
        },
      },
    });
    const associate = await Associate.findByPk(req.params.id);
    res.render('associates/edit', {
      action: 'Save Changes',
      states,
      associate,
      url: `/associates/${req.params.id}?_method=PUT`,
    });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    res.json(req.body);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
