import { Router } from "express";
import { postTask } from "../controllers/tasks-controllers";
import { hasPermission } from "../middlewares/rolePermissions";

const router = Router();

router.post("/tasks", hasPermission("create:own_tasks"), postTask);

export default router;
