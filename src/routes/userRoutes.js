const { Router } = require('express');
const { validateUserData } = require("../middlewares/userValidator");

const router = Router();

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.get('/users{/:id}', getUsers);
// router.get('/users/:id', getUserById);
router.post('/users', validateUserData, createUser);
router.put('/users', validateUserData, updateUser);
router.delete('/users', deleteUser);

module.exports = router;