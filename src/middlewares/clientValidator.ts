import { Request, Response, NextFunction } from "express";
import { errorMessage } from "../helpers/responseHelper";

const validateClient = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const client = req.body;

  if (!client) {
    errorMessage(res, 400, "You need send something");
    return;
  }

  if (!client?.id) {
    errorMessage(res, 400, "Client ID is required");
    return;
  }
  if (typeof client.id !== "string") {
    errorMessage(res, 400, "Client ID must be a string");
    return;
  }

  if (!client?.name) {
    errorMessage(res, 400, "Client name is required");
    return;
  }
  if (typeof client.name !== "string") {
    errorMessage(res, 400, "Client name must be a string");
    return;
  }

  next();
};

export { validateClient };
