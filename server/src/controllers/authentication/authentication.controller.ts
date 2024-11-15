import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../models/user.models";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserPayload } from "../../express";

dotenv.config();

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    if (!email || !password || !username || !role) {
      res.status(400).json({
        success: false,
        msg: "Please provide the appropriate credentials.",
      });
      throw new Error("No credentials provided!");
    }

    // hashing password
    const hashedpassword = await bcrypt.hash(password, 10);

    // creating a user
    const newUser = await User.create({
      id: uuidv4(),
      username,
      email,
      password: hashedpassword,
      role,
      createdAt: new Date(),
    });
    res.status(200).json({
      success: true,
      // data: newUser,
      msg: `${newUser.role.toUpperCase()} successfully created!`,
    });
  } catch (error) {
    console.error("something:", error);
    res.status(403).json({
      msg: error instanceof Error ? error.message : String(error),
    });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        msg: "Please enter your name, email and password",
      });
      return;
    }

    const isCredentials = await User.findOne({ email: email });

    if (!isCredentials) {
      res.status(302).json({
        success: false,
        msg: "User not found. Redirecting to signup...",
        redirect: "/api/auth/signup",
      });
      return;
    }

    // console.log("isCredentials:", isCredentials);
    const role = isCredentials.role;
    const id = isCredentials.id;
    const name = isCredentials.username;

    const payload = {
      role,
      id,
      name,
    };

    const accesstoken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );

    // console.log("refresh:", refreshToken);

    // setting the refresh token to the cookie in the header response
    res.cookie("refreshToken", refreshToken, {
      httpOnly: undefined,
      // secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      accesstoken: accesstoken,
      role: isCredentials.role,
    });
  } catch (error) {
    console.log("An internal server error occured");
    res.status(500).json({
      success: false,
      msg: "An internal server occured",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const refresh = async (req: Request, res: Response) => {

  const refreshToken = req.cookies.refreshToken

  // console.log('refreshing:', refreshToken)

  const verifyRefresh = jwt.verify(
    refreshToken as string,
    process.env.REFRESH_TOKEN_SECRET as string
  );

  // console.log("verfy refresh:", verifyRefresh);

  if (!verifyRefresh) {
    throw new Error("refresh token has expired");
  }

  req.user = verifyRefresh as UserPayload;
  console.log("user from refresh:", req.user);

  const isCredentials = await User.findOne({ username: req.user.name });

  if (!isCredentials) {
    res.status(401).json({
      success: false
    });
    return;
  }

  const role = isCredentials.role;
  const id = isCredentials.id;
  const name = isCredentials.username;

  const payload = {
    role,
    id,
    name,
  };

  const accesstoken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );

  res.json({ accesstoken, role: role });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("refreshToken");
  res.json({ msg: "Logout successful" });
};
