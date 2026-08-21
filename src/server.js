const express = require("express");
const userRoutes = require("./routes/userRoutes");

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
