"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSIONS = void 0;
exports.PERMISSIONS = {
    user: [
        "create:own_tasks",
        "update:own_tasks",
        "delete:own_tasks",
        "view:own_tasks",
    ],
    admin: ["update:all_tasks", "delete:all_tasks", "view:all_tasks"],
};
