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
exports.fetchUser = void 0;
const user_models_1 = require("../models/user.models");
const fetchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const user = yield user_models_1.User.findOne({ id: id }).select("-password");
        if (!user) {
            res.status(404).json({
                success: false,
                msg: "No user found",
            });
            throw new Error("No user found!");
        }
        res.status(200).json({ success: true, user: user });
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchUser = fetchUser;
