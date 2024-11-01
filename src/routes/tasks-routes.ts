import { Router } from "express";
import {
  deleteTask,
  getAllTasks,
  getTask,
  postTask,
  updateTask,
} from "../controllers/tasks-controllers";
import { hasPermission } from "../middlewares/rolePermissions";

const router = Router();

router.get("/", hasPermission("view:all_tasks"), getAllTasks);

router.post("/", hasPermission("create:own_tasks"), postTask);

router.get("/:id", getTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
