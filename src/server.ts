import "dotenv/config";
import express from "express";

import clientRoutes from "./routes/clientRoutes";
import authRoutes from "./routes/authRoutes";
import logger from "./middlewares/logger";
import { authenticateToken } from "./middlewares/authValidator";

const PORT: number = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Public routes (no authentication required)
app.use("/api", authRoutes);

// Protected routes (authentication required)
app.use(authenticateToken);
app.use("/api", clientRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
