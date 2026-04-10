import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../express";
import { logger } from "../logger";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("Undefined secret key for access token.");
  }

  try {
    if (!token) {
      res.status(401).json({ msg: "No token provided." });
      return;
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    req.user = user as UserPayload;
    next();
  } catch (error) {
    logger.error("verifyToken failed", error);
    res.status(403).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
