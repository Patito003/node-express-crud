import Router from "express";

import { validateClient } from "../middlewares/clientValidator";
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
router.post("/client", validateClient, createClient);
router.put("/client/:id", validateClient, updateClient);
router.delete("/client/:id", deleteClient);

export default router;
