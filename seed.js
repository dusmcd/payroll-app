const { db } = require('./db');

db.sync()
  .then(() => db.close())
  .catch(err => console.error(err.message));
