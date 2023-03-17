/// Import the Router module from the Express framework to create routes
const router = require('express').Router();

// Import controller functions from userController.js module
const {
getAllUser,
getUserById,
createUser,
updateUser,
deleteUser,
addFriend,
deleteFriend
} = require('../../controllers/userController');

// Route to get all users and create a new user
router.route('/')
.get(getAllUser)
.post(createUser);

// Route to get, update, or delete a user by ID
router.route('/:userId')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// Route to add or delete a friend to a user by user ID and friend ID
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

// Export the router
module.exports = router;