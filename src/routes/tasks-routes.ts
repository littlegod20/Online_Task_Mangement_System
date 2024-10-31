import { Router } from "express";
import { postTask } from "../controllers/tasks-controllers";
import { hasPermission } from "../middlewares/rolePermissions";
import { User } from "../models/user.models";

const router = Router();

router.get("/tasks", hasPermission("view:all_tasks"), async (req, res) => {
  try {
    const tasks = await User.find({});
    res.status(200).json({ success: true, tasks: tasks });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({
        success: false,
        msg: error instanceof Error ? error.message : String(error),
      });
  }
});

router.post("/tasks", hasPermission("create:own_tasks"), postTask);

export default router;
