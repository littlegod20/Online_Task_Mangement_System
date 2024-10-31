import { Request, Response } from "express";
import { User } from "../models/user.models";
import { Task } from "../models/task.models";
import { v4 as uuidv4 } from "uuid";

export const postTask = async (req: Request, res: Response) => {
  const { title, description, status, dueDate } = req.body;

  if (!title || !description || !status) {
    res.json({ success: false, msg: "Missing input required." });
    return;
  }

  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      res.status(404).json({
        success: false,
        msg: "User not found.",
      });
      return;
    }

    console.log(user);
    const creatTask = await Task.create({
      id: uuidv4(),
      userId: user._id,
      title,
      description,
      status,
      dueDate,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      task: creatTask,
    });
  } catch (error) {
    console.log("Error creating task:", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
