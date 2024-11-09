"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_controller_1 = require("../controllers/authentication/authentication.controller");
const router = express_1.default.Router();
router.post("/signup", authentication_controller_1.signUp);
router.post("/login", authentication_controller_1.login);
exports.default = router;
