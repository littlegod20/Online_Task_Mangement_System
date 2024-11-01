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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const user_models_1 = require("../models/user.models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role } = req.body;
        if (!email || !password || !username || !role) {
            res.status(400).json({
                success: false,
                msg: "Please provide the appropriate credentials.",
            });
            throw new Error("No credentials provided!");
        }
        // hashing password
        const hashedpassword = yield bcrypt_1.default.hash(password, 10);
        // creating a user
        const newUser = yield user_models_1.User.create({
            id: (0, uuid_1.v4)(),
            username,
            email,
            password: hashedpassword,
            role,
            createdAt: new Date(),
        });
        res.status(200).json({
            success: true,
            data: newUser,
            msg: `${newUser.role.toUpperCase()} successfully created!`,
        });
    }
    catch (error) {
        console.error("something:", error);
        res.status(403).json({
            msg: "An unexpected error occured",
            error: error instanceof Error ? error.message : String(error),
        });
        return;
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({
                success: false,
                msg: "Please enter your name, email and password",
            });
            return;
        }
        const isCredentials = yield user_models_1.User.findOne({ email: email });
        if (!isCredentials) {
            res.status(302).json({
                success: false,
                msg: "User not found. Redirecting to signup...",
                redirect: "api/auth/signup",
            });
            return;
        }
        console.log("isCredentials:", isCredentials);
        const role = isCredentials.role;
        const id = isCredentials.id;
        const payload = {
            username,
            email,
            password,
            role,
            id,
        };
        const accesstoken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({
            success: true,
            msg: `${payload.username} has successfully logged in!`,
            accesstoken: accesstoken,
        });
    }
    catch (error) {
        console.log("An internal server error occured");
        res.status(500).json({
            success: false,
            msg: "An internal server occured",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.login = login;
