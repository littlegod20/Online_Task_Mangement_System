import { Request, Response } from "express";
import { User } from "../models/user.models";

export const fetchUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({ id: id });

    if (!user) {
      res.status(404).json({
        success: false,
        msg: "No user found",
      });
      throw new Error("No user found!");
    }

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log(error);
  }
};
