"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_controllers_1 = require("../controllers/authentication-controllers");
const validators_1 = require("../middlewares/validators");
const router = express_1.default.Router();
router.post("/signup", validators_1.emailValidator, authentication_controllers_1.signUp);
router.post("/login", authentication_controllers_1.login);
exports.default = router;
