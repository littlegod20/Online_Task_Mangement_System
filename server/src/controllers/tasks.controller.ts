import { Request, Response } from "express";
import { User } from "../models/user.models";
import { Task } from "../models/task.models";
import { v4 as uuidv4 } from "uuid";

export const postTask = async (req: Request, res: Response) => {
  const { title, description, status, date } = req.body;

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
      userId: user.id,
      title,
      description,
      status,
      date,
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

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { role, id } = req.user;

    // calculating starting index for MongDB
    const startIndex = (page - 1) * limit;

    let tasks;
    if (role === "user") {
      tasks = await Task.find({ userId: id })
        .skip(startIndex)
        .limit(limit);
    } else if (role === "admin") {
      // Getting tasks with pagination
      tasks = await Task.find({}).skip(startIndex).limit(limit);
    }

    // console.log('role:',role)
    // console.log('userId:', id)
    // console.log('user', req.user)
    // getting total number of tasks
    const totalTasks = await Task.countDocuments({});

    res.status(200).json({
      success: true,
      role:role,
      tasks: tasks,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks: totalTasks,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user;
    const taskId = req.params.id;

    if (!role) {
      throw new Error("Role not specified.");
    }

    if (role === "user") {
      const task = await Task.findOne({ id: taskId, userId: id });

      res.status(200).json({
        task:
          task === null
            ? "Task with this id was not found in user's created tasks"
            : task,
      });
      return;
    } else if (role === "admin") {
      const task = await Task.findOne({ id: taskId });
      res.status(200).json({ task: task });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      msg: "An internal server error occured",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user;
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    const data = {
      title,
      description,
      status,
    };

    if (!role) {
      throw new Error("Role not specified.");
    }

    if (role === "user") {
      const updatedTask = await Task.findOneAndUpdate(
        { id: taskId, userId: id },
        { $set: data },
        { new: true }
      );

      res.status(200).json({
        updatedTask:
          updatedTask === null
            ? "Task with this id was not found in user's created tasks"
            : updatedTask,
      });
      return;
    } else if (role === "admin") {
      const updatedTask = await Task.findOneAndUpdate(
        { id: taskId },
        { $set: data },
        { new: true }
      );
      res.status(200).json({ task: updatedTask });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      msg: "An internal server error occured",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user;
    const taskId = req.params.id;

    if (!role) {
      throw new Error("Role not specified.");
    }

    if (role === "user") {
      const deletedTask = await Task.findOneAndDelete({
        id: taskId,
        userId: id,
      });

      res.status(200).json({
        deletedTask:
          deletedTask === null
            ? "Task with this id was not found in user's created tasks"
            : deletedTask,
      });
      return;
    } else if (role === "admin") {
      const deletedTask = await Task.findOneAndDelete({ id: taskId });
      res.status(200).json({ deletedTask: deletedTask });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      msg: "An internal server error occured",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
