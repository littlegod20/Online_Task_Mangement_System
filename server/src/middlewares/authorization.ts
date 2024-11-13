import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("Undefined secret key for access token.");
  }

  // console.log("verify:", token);
  // console.log("auth:", req.headers.authorization);
  try {
    if (!token) {
      res.status(401).json({ msg: "No token provided." });
      return;
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    req.user = user as UserPayload;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
