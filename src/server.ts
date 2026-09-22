import express from "express";

import clientRoutes from "./routes/clientRoutes";
import logger from "./middlewares/logger";

const PORT: number = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("/api", clientRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
