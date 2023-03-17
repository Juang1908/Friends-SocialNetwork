// Import express router module
const router = require('express').Router();

// Import userRoutes and thoughtRoutes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Define user and thought routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export router
module.exports = router;