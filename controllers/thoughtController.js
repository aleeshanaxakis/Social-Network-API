const { Thought, Reaction } = require('../models');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .populate('reactions');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      await Reaction.deleteMany({ _id: { $in: thought.reactions } });
      res.json({ message: 'Thought and reactions deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createReaction: async (req, res) => {
    try {
      const reaction = await Reaction.create(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: reaction._id } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.params.reactionId } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID :(' });
      }

      await Reaction.findOneAndDelete({ _id: req.params.reactionId });
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;