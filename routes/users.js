const router = require('express').Router();
const getStates = require('../helper/states');
const passport = require('passport');
const { User } = require('../db');

router.get('/signup', async (req, res, next) => {
  try {
    const states = await getStates();
    res.render('users/signup', { states });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  const newUser = await User.create(req.body);
  req.login(newUser, err => (err ? next(err) : res.redirect('/')));
});

router.get('/login', (req, res, next) => {
  res.render('users/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

module.exports = router;
