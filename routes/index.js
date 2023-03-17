// Importing the 'Router' function from the 'express' module
const router = require('express').Router();

// Importing the API routes from a separate file './api'
const apiRoutes = require('./api');

// Mounting the imported API routes under the '/api' endpoint
router.use('/api', apiRoutes);

// A catch-all route that will be executed for any route that hasn't been matched yet.
router.use((req, res) => {
  // Sending a response with the 'Wrong route!' message.
  return res.send('Wrong route!');
});

// Exporting the router instance to be used in other parts of the application.
module.exports = router;
