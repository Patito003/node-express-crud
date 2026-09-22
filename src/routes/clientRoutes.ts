import Router from "express";

import { validateBody } from "../middlewares/clientValidator";
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clientController";

const router = Router();

router.get("/client", getClients);
router.get("/client/:id", getClientById);
router.post("/client", validateBody, createClient);
router.put("/client/:id", validateBody, updateClient);
router.delete("/client/:id", deleteClient);

export default router;
