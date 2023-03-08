const { User, Thought } = require('../models');
// const { create } = require('../models/User');

module.exports = {
    getThought(req, res) {
      Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    
    // Get a single thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought found with that id' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'Thought created, but found no User with that ID' })
          : res.json('thought')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// Updating thought
  updateThought(req, res) {
    Thought.findByIdAndUpdate(
        {_id: req.params.thoughtId},
        {$set: req.body },
        {runValidators: true, new: true}

    )
    .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought not with this ID' })
          : res.json('user')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// Creting new reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    .then((thought) =>
    !thought
      ? res
          .status(404)
          .json({ message: 'Thought not with this ID' })
      : res.json('user')
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  },

// Deleting thoughts
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
      !user
        ? res
            .status(404)
            .json({ message: 'Thought has been deleted, but no user found with this ID' })
        : res.json({message: 'Thought deleted!'})
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
    },

// Deleting reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
    .then((thought) =>
    !thought
      ? res
          .status(404)
          .json({ message: 'Thought not with this ID' })
      : res.json('user')
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  },
};