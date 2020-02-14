const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressHbars = require('express-handlebars');

app.engine('handlebars', expressHbars());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.get('/', (req, res, next) => {
  res.render('home', { name: 'Dustin' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
