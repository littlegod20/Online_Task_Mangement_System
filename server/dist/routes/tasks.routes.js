"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_1 = require("../controllers/tasks.controller");
const rolePermissions_1 = require("../middlewares/rolePermissions");
const router = (0, express_1.Router)();
// get all tasks
router.get("/", tasks_controller_1.getAllTasks);
router.post("/", (0, rolePermissions_1.hasPermission)("create:own_tasks"), tasks_controller_1.postTask);
router.get("/:id", (0, rolePermissions_1.hasPermission)("view:own_tasks"), tasks_controller_1.getTask);
router.put("/:id", tasks_controller_1.updateTask);
router.delete("/:id", tasks_controller_1.deleteTask);
exports.default = router;
