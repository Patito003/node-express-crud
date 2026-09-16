import Router from "express";

import { validateBody } from "../middlewares/userValidator";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", validateBody, createUser);
router.put("/users/:id", validateBody, updateUser);
router.delete("/users/:id", deleteUser);

export default router;
