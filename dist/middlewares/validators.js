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
exports.passwordValidator = exports.emailValidator = void 0;
const user_models_1 = require("../models/user.models");
const emailValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ success: false, msg: "Email is missing in form" });
        return;
    }
    const isEmail = yield user_models_1.User.findOne({ email: email });
    if (isEmail) {
        res.status(400).json({
            success: false,
            msg: "Email already exists. Please use a different email.",
        });
        return;
    }
    next();
});
exports.emailValidator = emailValidator;
const passwordValidator = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        res
            .status(400)
            .json({ success: false, msg: "Password is missing from the form" });
        return;
    }
    const regex = /([A-Za-z0-9]+){6,}/i;
    // password must be six or more characters long.
    if (regex.test(password) === false) {
        res.status(400).json({
            success: false,
            msg: "Password must be 6 or more chars long with at least one lowercase and uppercase letter and digit",
        });
        return;
    }
    next();
};
exports.passwordValidator = passwordValidator;
