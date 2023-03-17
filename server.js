// Importing the 'express' module and database connection
const express = require('express');
const db = require('./config/connection');
// Importing the routes from a separate file './routes'
const routes = require('./routes');
// Importing the 'moment' module to format the time
const moment = require('moment');
// Testing time
let time;
time = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log(time);
// Declaring the port number to run the server on
const PORT = 3001;
// Creating an Express.js application instance
const app = express();
// Adding middleware to parse incoming request bodies in JSON and URL-encoded formats
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// Once the database connection is open, start listening for requests on the specified port
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port http://localhost:${PORT}`);
  });
});