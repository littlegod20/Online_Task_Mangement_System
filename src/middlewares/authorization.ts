import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
  username: string;
  email: string;
  password: string;
}

export interface CustomRequest extends Request {
  user: UserPayload;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ msg: "No token provided." });
    return;
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
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
    res.status(403).json({ success: false, msg: "Invalid token." });
  }
};
