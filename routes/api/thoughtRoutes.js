const router = require('express').Router();
const {
    getThoughts,             // function to get all thoughts
    getSingleThought,       // function to get a single thought by id
    createThought,          // function to create a new thought
    updateThought,          // function to update an existing thought by id
    deleteThought,          // function to delete a thought by id
    createReaction,         // function to create a new reaction for a thought
    deleteReaction          // function to delete a reaction by id
} = require('../../controllers/thoughtController');

// Routes for getting all thoughts and creating a new thought
router.route('/')
    .get(getThoughts)
    .post(createThought);

// Routes for getting, updating and deleting a single thought by id
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// Route for creating a new reaction for a thought
router.route('/:thoughtId/reactions')
    .post(createReaction);

// Route for deleting a reaction by id
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

// Export the router
module.exports = router;
