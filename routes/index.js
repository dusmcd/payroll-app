const router = require('express').Router();

router.use('/associates', require('./associates'));
router.use('/auth', require('./users'));

module.exports = router;
