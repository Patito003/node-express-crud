import { Request } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: jwt.JwtPayload;
}

export { AuthRequest };
