"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_controllers_1 = require("../controllers/authentication/authentication-controllers");
const router = express_1.default.Router();
router.post("/signup", authentication_controllers_1.signUp);
router.post("/login", authentication_controllers_1.login);
exports.default = router;
