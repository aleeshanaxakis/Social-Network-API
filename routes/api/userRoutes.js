const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// GET all users
router.get('/', getAllUsers);

// GET a single user by its _id and populated thought and friend data
router.get('/:id', getUserById);

// POST a new user
router.post('/', createUser);

// PUT to update a user by its _id
router.put('/:id', updateUser);

// DELETE to remove user by its _id
router.delete('/:id', deleteUser);

module.exports = router;