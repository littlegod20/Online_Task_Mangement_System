"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controllers_1 = require("../controllers/tasks-controllers");
const rolePermissions_1 = require("../middlewares/rolePermissions");
const router = (0, express_1.Router)();
router.get("/", (0, rolePermissions_1.hasPermission)("view:all_tasks"), tasks_controllers_1.getAllTasks);
router.post("/", (0, rolePermissions_1.hasPermission)("create:own_tasks"), tasks_controllers_1.postTask);
router.get("/:id", tasks_controllers_1.getTask);
router.put("/:id", tasks_controllers_1.updateTask);
router.delete("/:id", tasks_controllers_1.deleteTask);
exports.default = router;
