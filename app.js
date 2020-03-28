const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressHbars = require('express-handlebars');
const volleyball = require('volleyball');
const { db } = require('./db');

app.engine('handlebars', expressHbars());
app.set('view engine', 'handlebars');

app.use(require('method-override')('_method'));
app.use(volleyball);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.get('/', (req, res, next) => {
  try {
    res.render('home');
  } catch (err) {
    next(err);
  }
});

app.use(require('./routes'));

app.use((err, req, res, next) => {
  if (err.status === 404) {
    return next();
  }
  err.status = 500;
  res.status(500);
  console.error(err.message);
  res.render('error', { status: err.status });
});

app.use((req, res, next) => {
  res.render('notfound');
});

(async function() {
  await db.sync();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
})();
