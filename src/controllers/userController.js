const { Users } = require("../database/usersData");
const { errorMessage } = require("../helpers/responseHelper");

const getUsers = (req, res) => {
  return res.status(200).json(Users);
};

const getUserById = (req, res) => {
  const id = req?.params?.id;
  if (!id) return errorMessage(res, 400, "User ID is required");

  const userIndex = Users.findIndex((userDataBase) => userDataBase.id === id);
  if (userIndex === -1) return errorMessage(res, 404, "User not found");

  return res.status(200).json(Users[userIndex]);
};

const createUser = (req, res) => {
  const user = req.body;

  const userIndex = Users.findIndex(
    (userDataBase) => userDataBase.id === user.id,
  );
  if (userIndex !== -1) return errorMessage(res, 409, "User already exists");

  Users.push(user);
  return res.status(201).json({ message: "User created successfully", user });
};

const updateUser = (req, res) => {
  const user = req.body;
  const id = req.params?.id;

  if (!id) return errorMessage(res, 400, "User ID is required");

  const userIndex = Users.findIndex((userDataBase) => userDataBase.id === id);
  if (userIndex === -1) return errorMessage(res, 404, "User not found");
  Users[userIndex] = user;

  return res.status(200).json({ message: "User updated successfully", user });
};

const deleteUser = (req, res) => {
  const id = req.params?.id;

  if (!id) return errorMessage(res, 400, "User ID is required");

  const userIndex = Users.findIndex((userDataBase) => userDataBase.id === id);
  if (userIndex === -1) return errorMessage(res, 404, "User not found");

  const userRemoved = Users.splice(userIndex, 1);
  return res
    .status(200)
    .json({ message: "User deleted successfully", user: userRemoved });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
