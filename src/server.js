const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Users = [];

app.get("/users/list{/:id}", (req, res) => {
  const id = parseInt(req?.params?.id);
  if (!id) return res.status(200).json(Users);
  if (typeof id !== "number")
    return res.status(400).json({ error: "User ID must be a number" });

  const userIndex = Users.findIndex(
    (userDataBase) => userDataBase.id === id,
  );
  if (userIndex === -1) return res.status(404).json({ error: "User not found" });
  
  return res.status(200).json(Users[userIndex]);
});

app.post("/users/create", (req, res) => {
  const user = req.body;
  if (!user) return res.status(400).json({ error: "You need send something" });
  if (!user?.id) return res.status(400).json({ error: "User ID is required" });
  if (typeof user.id !== "number")
    return res.status(400).json({ error: "User ID must be a number" });
  if (!user?.name)
    return res.status(400).json({ error: "User name is required" });
  if (typeof user.name !== "string")
    return res.status(400).json({ error: "User name must be a string" });

  Users.push(user);
  return res.status(201).json({ message: "User created successfully", user });
});

app.put("/users/update", (req, res) => {
  const user = req.body;
  if (!user) return res.status(400).json({ error: "You need send something" });
  if (!user?.id) return res.status(400).json({ error: "User ID is required" });
  if (typeof user.id !== "number")
    return res.status(400).json({ error: "User ID must be a number" });
  if (!user?.name)
    return res.status(400).json({ error: "User name is required" });
  if (typeof user.name !== "string")
    return res.status(400).json({ error: "User name must be a string" });

  const userIndex = Users.findIndex(
    (userDataBase) => userDataBase.id === user.id,
  );
  if (userIndex === -1)
    return res.status(404).json({ error: "User not found" });

  Users[userIndex] = user;
  return res.status(200).json({ message: "User updated successfully", user });
});

app.delete("/users/delete", (req, res) => {
  const user = req.body;
  if (!user) return res.status(400).json({ error: "You need send something" });
  if (!user?.id) return res.status(400).json({ error: "User ID is required" });
  if (typeof user.id !== "number")
    return res.status(400).json({ error: "User ID must be a number" });

  const userIndex = Users.findIndex(
    (userDataBase) => userDataBase.id === user.id,
  );
  if (userIndex === -1) return res.status(404).json({ error: "User not found" });

  const userRemoved = Users.splice(userIndex, 1);
  return res.status(200).json({ message: "User deleted successfully", user: userRemoved });
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
