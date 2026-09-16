const { Router } = require("express");
const { validateBody } = require("../middlewares/userValidator");

const router = Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", validateBody, createUser);
router.put("/users/:id", validateBody, updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
