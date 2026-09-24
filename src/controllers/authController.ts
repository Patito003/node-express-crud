import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import Users from "../database/usersData";
import { User } from "../interfaces/user.interface";
import { errorMessage } from "../helpers/responseHelper";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

// POST /api/register
const register = (req: Request, res: Response): void => {
  const user = req.body;

  const userIndex = Users.findIndex((userData) => userData.id === user.id);

  if (userIndex !== -1) {
    errorMessage(res, 409, "User already exists");
    return;
  }

  Users.push(user);
  res.status(201).json({ message: "User created successfully", user });
};

// POST /api/login
const login = (req: Request, res: Response): Response => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorMessage(res, 400, "Email and password are required");
  }

  const user = Users.find((u: User) => u.email === email);

  if (!user || user.password !== password) {
    return errorMessage(res, 401, "Invalid email or password");
  }

  const userPayload = { id: user.id, name: user.name };
  const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "7d" }); // 30 (seconds) - m (minutes) - h (hours) - d (days) - y (years)

  return res.status(200).json({ message: "Login successful", token });
};

export { login, register };
