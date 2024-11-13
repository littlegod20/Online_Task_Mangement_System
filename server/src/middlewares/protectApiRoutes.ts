import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./authorization";

export const protectApiRoutes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.path.startsWith("/api/auth") || req.path.startsWith("/api/refresh")) {
    next();
    return;
  }
  verifyToken(req, res, next);
};
