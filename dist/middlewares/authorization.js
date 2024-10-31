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
    if (!token) {
        res.status(401).json({ msg: "No token provided." });
        return;
    }
    // console.log(process.env.JWT_SECRET_KEY as string);
    if (!process.env.JWT_SECRET_KEY) {
        res.json({ msg: "Undefined secret key for access token." });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                throw new Error("token has expired");
            }
            req.user = user;
            // console.log("user:", req.user);
            next();
        });
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            success: false,
            msg: "Invalid token.",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.verifyToken = verifyToken;
