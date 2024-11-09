import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user: UserPayload;
  }
}

export interface UserPayload extends JwtPayload {
  username: string;
  email: string;
  password: string;
  role: string;
  id: string;
}
