import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.models";

export const emailValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ success: false, msg: "Email is missing in form" });
    return;
  }

  const isEmail = await User.findOne({ email: email });

  if (isEmail) {
    res.status(400).json({
      success: false,
      msg: "Email already exists. Please use a different email.",
    });
    return;
  }
  next();
};

export const passwordValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  if (!password) {
    res
      .status(400)
      .json({ success: false, msg: "Password is missing from the form" });
    return;
  }

  const regex = /([A-Za-z0-9]+){6,}/i;

  // password must be six or more characters long.
  if (regex.test(password) === false) {
    res.status(400).json({
      success: false,
      msg: "Password must be 6 or more chars long with at least one lowercase and uppercase letter and digit",
    });
    return;
  }
  next();
};
