const router = require('express').Router();
const getStates = require('../helper/states');
const passport = require('passport');
const { User, Company } = require('../db');

router.get('/signup', async (req, res, next) => {
  try {
    const states = await getStates();
    res.render('users/signup', { states });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const newCompany = await Company.create({
      name: req.body.name,
      EIN: req.body.ein,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
    });

    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      companyId: newCompany.id,
    });
    req.login(newUser, err => (err ? next(err) : res.redirect('/')));
  } catch (err) {
    next(err);
  }
});

router.get('/login', (req, res, next) => {
  res.render('users/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
  })
);

router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
