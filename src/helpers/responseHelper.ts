import { Response } from "express";

const errorMessage = (
  res: Response,
  statusCode: number,
  message: string,
): Response => {
  if (!res || !statusCode || !message) {
    throw new Error("Missing parameters for errorMessage function");
  }

  if (typeof statusCode !== "number" || typeof message !== "string") {
    throw new Error("Invalid parameters for errorMessage function");
  }

  return res.status(statusCode).json({ error: message });
};

export { errorMessage };
