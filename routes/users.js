const router = require('express').Router();
const getStates = require('../helper/states');

router.get('/signup', async (req, res, next) => {
  try {
    const states = await getStates();
    res.render('users/signup', { states });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', (req, res, next) => {
  res.json(req.body);
});

router.get('/login', (req, res, next) => {
  res.render('users/login');
});

module.exports = router;
