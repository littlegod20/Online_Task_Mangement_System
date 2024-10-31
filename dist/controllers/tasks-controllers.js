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
exports.postTask = void 0;
const user_models_1 = require("../models/user.models");
const task_models_1 = require("../models/task.models");
const uuid_1 = require("uuid");
const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, dueDate } = req.body;
    if (!title || !description || !status) {
        res.json({ success: false, msg: "Missing input required." });
        return;
    }
    try {
        const user = yield user_models_1.User.findOne({ email: req.user.email });
        if (!user) {
            res.status(404).json({
                success: false,
                msg: "User not found.",
            });
            return;
        }
        console.log(user);
        const creatTask = yield task_models_1.Task.create({
            id: (0, uuid_1.v4)(),
            userId: user._id,
            title,
            description,
            status,
            dueDate,
            createdAt: new Date(),
        });
        res.status(201).json({
            success: true,
            task: creatTask,
        });
    }
    catch (error) {
        console.log("Error creating task:", error);
        res.status(500).json({
            success: false,
            msg: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.postTask = postTask;
