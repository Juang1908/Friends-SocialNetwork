const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const moment = require('moment');

let val;
val = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log(val);

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});