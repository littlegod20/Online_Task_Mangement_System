import { Router } from "express";
import {
  deleteTask,
  getAllTasks,
  getTask,
  postTask,
  updateTask,
} from "../controllers/tasks.controller";
import { hasPermission } from "../middlewares/rolePermissions";

const router = Router();

// get all tasks
router.get("/", getAllTasks);

router.post("/", hasPermission("create:own_tasks"), postTask);

router.get("/:id", hasPermission("view:own_tasks"), getTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
