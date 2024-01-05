const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../controllers/thoughtController');

// GET all thoughts
router.get('/', getAllThoughts);

// GET a single thought by its _id
router.get('/:id', getThoughtById);

// POST a new thought
router.post('/', createThought);

// PUT to update a thought by its _id
router.put('/:id', updateThought);

// DELETE to remove thought by its _id
router.delete('/:id', deleteThought);

// POST to create a reaction to a thought
router.post('/:thoughtId/reactions', createReaction);

// DELETE to remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;