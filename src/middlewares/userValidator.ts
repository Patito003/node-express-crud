import { Request, Response, NextFunction } from "express";
import { errorMessage } from "../helpers/responseHelper";

const validateBody = (
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

  if (!user?.name) {
    errorMessage(res, 400, "User name is required");
    return;
  }
  if (typeof user.name !== "string") {
    errorMessage(res, 400, "User name must be a string");
    return;
  }

  next();
};

export { validateBody };
