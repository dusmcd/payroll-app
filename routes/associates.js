const router = require('express').Router();

router.get('/new', (req, res, next) => {
  res.render('associates/new', {
    action: 'Submit',
  });
});

router.post('/', (req, res, next) => {
  res.send(req.body);
});

router.get('/edit/:id', (req, res, next) => {
  res.render('associates/edit', {
    action: 'Save Changes',
  });
});

module.exports = router;
