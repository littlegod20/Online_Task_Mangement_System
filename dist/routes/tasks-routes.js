"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controllers_1 = require("../controllers/tasks-controllers");
const rolePermissions_1 = require("../middlewares/rolePermissions");
const router = (0, express_1.Router)();
router.post("/tasks", (0, rolePermissions_1.hasPermission)("create:own_tasks"), tasks_controllers_1.postTask);
exports.default = router;
