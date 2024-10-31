"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = void 0;
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
