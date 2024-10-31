import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ msg: "No token provided." });
    return;
  }

  if (!process.env.JWT_SECRET_KEY) {
    res.json({ msg: "Undefined secret key for access token." });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
      if (err) {
        throw new Error("token has expired");
      }
      req.user = user as UserPayload;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      msg: "Invalid token.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
