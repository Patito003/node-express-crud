import Router from "express";

import { login, register } from "../controllers/authController";
import { validateUser } from "../middlewares/authValidator";

const router = Router();

router.post("/register", validateUser, register);
router.post("/login", login);

export default router;
