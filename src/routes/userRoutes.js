const { Router } = require('express');
const { validateUserData } = require("../middlewares/userValidator");

const router = Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', validateUserData, createUser);
router.put('/users/:id', validateUserData, updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;