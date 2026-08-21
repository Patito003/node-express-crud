const { Router } = require('express');
const router = Router();

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.get('/users{/:id}', getUsers);
// router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users', updateUser);
router.delete('/users', deleteUser);

module.exports = router;