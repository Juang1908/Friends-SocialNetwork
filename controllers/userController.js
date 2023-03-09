
const { User, Thought } = require("../models");

module.exports = {
//  get all users
    getAllUser(req, res) {
      User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

// get single user
    getUserById(req, res) {
        User.findOne({_id: req.params.userId})
            .populate('friends')
            .populate('thoughts')
            .select('-__v')
            .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));

    },
// create new user
    createUser(req, res) {
        User.create(req.body)
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
        
    },
// Update user info
    updateUser(req,res) {
        User.findByIdAndUpdate( {_id: req.params.userId}, {$set: req.body}, {runValidators: true, new: true})
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },
// add user id to friends array
    addFriend(req, res) {
        User.findByIdAndUpdate (
            {_id: req.params.userId},
            {$addToSet: { friends: req.params.friendId}},
            {runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },
// Delete User
    deleteUser(req, res) {
        User.findByIdAndDelete ({_id: req.params.userId})
        .then((user) =>
        !user
          ? res.status(204).json({ message: 'No User found with that ID' })
          : Thought.deleteMany({_id: {$in: user.thoughts}}))
          .then(() =>res.status(404).json({ message: 'User Deleted' }))
          .catch((err) => res.status(500).json(err));
    },
// remove friend
deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },{ $pull: { friends: req.params.friendId } },
      { new: true })
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No User found with that ID' })
      : res.json(user))
    .catch((err) => res.status(500).json(err));
    },
};