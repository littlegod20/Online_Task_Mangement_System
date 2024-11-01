import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user.models";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
      data: newUser,
      msg: `${newUser.role.toUpperCase()} successfully created!`,
    });
  } catch (error) {
    console.error("something:", error);
    res.status(403).json({
      msg: "An unexpected error occured",
      error: error instanceof Error ? error.message : String(error),
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
        redirect: "api/auth/signup",
      });
      return;
    }

    console.log("isCredentials:", isCredentials);
    const role = isCredentials.role;
    const id = isCredentials.id;
    const payload = {
      username,
      email,
      password,
      role,
      id,
    };

    const accesstoken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      msg: `${payload.username} has successfully logged in!`,
      accesstoken: accesstoken,
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
