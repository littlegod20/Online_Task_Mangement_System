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
exports.deleteTask = exports.updateTask = exports.getTask = exports.getAllTasks = exports.postTask = void 0;
const user_models_1 = require("../models/user.models");
const task_models_1 = require("../models/task.models");
const uuid_1 = require("uuid");
const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, date } = req.body;
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
            userId: user.id,
            title,
            description,
            status,
            date,
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
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { role, id } = req.user;
        // calculating starting index for MongDB
        const startIndex = (page - 1) * limit;
        let tasks;
        if (role === "user") {
            tasks = yield task_models_1.Task.find({ userId: id })
                .skip(startIndex)
                .limit(limit);
        }
        else if (role === "admin") {
            // Getting tasks with pagination
            tasks = yield task_models_1.Task.find({}).skip(startIndex).limit(limit);
        }
        // console.log('role:',role)
        // console.log('userId:', id)
        // console.log('user', req.user)
        // getting total number of tasks
        const totalTasks = yield task_models_1.Task.countDocuments({});
        res.status(200).json({
            success: true,
            role: role,
            tasks: tasks,
            page: page,
            limit: limit,
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks: totalTasks,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.getAllTasks = getAllTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, id } = req.user;
        const taskId = req.params.id;
        if (!role) {
            throw new Error("Role not specified.");
        }
        if (role === "user") {
            const task = yield task_models_1.Task.findOne({ id: taskId, userId: id });
            res.status(200).json({
                task: task === null
                    ? "Task with this id was not found in user's created tasks"
                    : task,
            });
            return;
        }
        else if (role === "admin") {
            const task = yield task_models_1.Task.findOne({ id: taskId });
            res.status(200).json({ task: task });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            success: false,
            msg: "An internal server error occured",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.getTask = getTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, id } = req.user;
        const taskId = req.params.id;
        const { title, description, status } = req.body;
        const data = {
            title,
            description,
            status,
        };
        if (!role) {
            throw new Error("Role not specified.");
        }
        if (role === "user") {
            const updatedTask = yield task_models_1.Task.findOneAndUpdate({ id: taskId, userId: id }, { $set: data }, { new: true });
            res.status(200).json({
                updatedTask: updatedTask === null
                    ? "Task with this id was not found in user's created tasks"
                    : updatedTask,
            });
            return;
        }
        else if (role === "admin") {
            const updatedTask = yield task_models_1.Task.findOneAndUpdate({ id: taskId }, { $set: data }, { new: true });
            res.status(200).json({ task: updatedTask });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            success: false,
            msg: "An internal server error occured",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, id } = req.user;
        const taskId = req.params.id;
        if (!role) {
            throw new Error("Role not specified.");
        }
        if (role === "user") {
            const deletedTask = yield task_models_1.Task.findOneAndDelete({
                id: taskId,
                userId: id,
            });
            res.status(200).json({
                deletedTask: deletedTask === null
                    ? "Task with this id was not found in user's created tasks"
                    : deletedTask,
            });
            return;
        }
        else if (role === "admin") {
            const deletedTask = yield task_models_1.Task.findOneAndDelete({ id: taskId });
            res.status(200).json({ deletedTask: deletedTask });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            success: false,
            msg: "An internal server error occured",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.deleteTask = deleteTask;
