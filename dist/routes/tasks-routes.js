"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controllers_1 = require("../controllers/tasks-controllers");
const rolePermissions_1 = require("../middlewares/rolePermissions");
const user_models_1 = require("../models/user.models");
const router = (0, express_1.Router)();
router.get("/tasks", (0, rolePermissions_1.hasPermission)("view:all_tasks"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield user_models_1.User.find({});
        res.status(200).json({ success: true, tasks: tasks });
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
            success: false,
            msg: error instanceof Error ? error.message : String(error),
        });
    }
}));
router.post("/tasks", (0, rolePermissions_1.hasPermission)("create:own_tasks"), tasks_controllers_1.postTask);
exports.default = router;
