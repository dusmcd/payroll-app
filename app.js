const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressHbars = require('express-handlebars');
const volleyball = require('volleyball');
const { db, User } = require('./db');
const passport = require('passport');
const session = require('express-session');

if (process.env.NODE_ENV !== 'production') {
  require('./secrets');
}

// view engine
app.engine('handlebars', expressHbars());
app.set('view engine', 'handlebars');

// common middleware
app.use(require('method-override')('_method'));
app.use(volleyball);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

// sessions and passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

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
