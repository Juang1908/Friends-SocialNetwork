// Import the connect and connection functions from the Mongoose module
const { connect, connection } = require('mongoose');

// Connect to the MongoDB database using the connect function and specifying the database URL and options
connect('mongodb://127.0.0.1/friendssocialnetworkDB', {
useNewUrlParser: true,
useUnifiedTopology: true,
});

// Export the connection object for use in other parts of the application
module.exports = connection;