import { Request, Response } from "express";

import Users from "../database/usersData";
import { errorMessage } from "../helpers/responseHelper";

// GET /api/users
const getUsers = (req: Request, res: Response): void => {
  res.status(200).json(Users);
};

// GET /api/users/:id
const getUserById = (req: Request, res: Response): void => {
  const id = req?.params?.id;
  if (!id) {
    errorMessage(res, 400, "User ID is required");
    return;
  }

  const userIndex = Users.findIndex((userDataBase) => userDataBase.id === id);
  if (userIndex === -1) {
    errorMessage(res, 404, "User not found");
    return;
  }

  res.status(200).json(Users[userIndex]);
};

// POST /api/users
const createUser = (req: Request, res: Response): void => {
  const user = req.body;

  const userIndex = Users.findIndex(
    (userDataBase) => userDataBase.id === user.id,
  );

  if (userIndex !== -1) {
    errorMessage(res, 409, "User already exists");
    return;
  }

  Users.push(user);
  res.status(201).json({ message: "User created successfully", user });
};

// PUT /api/users/:id
const updateUser = (req: Request, res: Response): void => {
  const user = req.body;
  const id = req.params?.id;

  if (!id) {
    errorMessage(res, 400, "User ID is required");
    return;
  }

  const userIndex = Users.findIndex((userDataBase) => userDataBase.id === id);
  if (userIndex === -1) {
    errorMessage(res, 404, "User not found");
    return;
  }

  Users[userIndex] = user;

  res.status(200).json({ message: "User updated successfully", user });
};

// DELETE /api/users/:id
const deleteUser = (req: Request, res: Response): void => {
  const id = req.params?.id;

  if (!id) {
    errorMessage(res, 400, "User ID is required");
    return;
  }

  const userIndex = Users.findIndex((userDataBase) => userDataBase.id === id);
  if (userIndex === -1) {
    errorMessage(res, 404, "User not found");
    return;
  }

  const userRemoved = Users.splice(userIndex, 1);
  res
    .status(200)
    .json({ message: "User deleted successfully", user: userRemoved });
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
