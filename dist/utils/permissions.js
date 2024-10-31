"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSIONS = void 0;
exports.PERMISSIONS = {
    user: [
        "create:own_tasks",
        "update:own_task",
        "delete:own_tasks",
        "view:own_tasks",
    ],
    admin: ["update:all_task", "delete:all_tasks", "view:all_tasks"],
};
