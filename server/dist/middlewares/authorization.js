"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("Undefined secret key for access token.");
    }
    // console.log("verify:", token);
    // console.log("auth:", req.headers.authorization);
    try {
        if (!token) {
            res.status(401).json({ msg: "No token provided." });
            return;
        }
        const user = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log('from verifyToken:', user)
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.verifyToken = verifyToken;
