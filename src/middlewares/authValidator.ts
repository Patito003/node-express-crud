import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AuthRequest } from "../interfaces/auth.interface";
import { errorMessage } from "../helpers/responseHelper";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return errorMessage(res, 401, "Token not provided");
  }

  try {
    const userDecoded = jwt.verify(token, JWT_SECRET);

    if (typeof userDecoded === "string") {
      return errorMessage(res, 401, "Invalid token format");
    }

    req.user = userDecoded;
    next();
  } catch (error) {
    return errorMessage(res, 403, "Invalid or expired token");
  }
};

const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.body;

  if (!user) {
    errorMessage(res, 400, "You need send something");
    return;
  }

  if (!user?.id) {
    errorMessage(res, 400, "User ID is required");
    return;
  }
  if (typeof user.id !== "string") {
    errorMessage(res, 400, "User ID must be a string");
    return;
  }

  if (!user?.email) {
    errorMessage(res, 400, "User email is required");
    return;
  }
  if (typeof user.email !== "string") {
    errorMessage(res, 400, "User email must be a string");
    return;
  }

  if (!user?.password) {
    errorMessage(res, 400, "User password is required");
    return;
  }
  if (typeof user.password !== "string") {
    errorMessage(res, 400, "User password must be a string");
    return;
  }

  next();
};

export { authenticateToken, validateUser };
