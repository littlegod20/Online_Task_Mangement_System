"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = void 0;
const permissions_1 = require("../utils/permissions");
const hasPermission = (permission) => {
    return (req, res, next) => {
        const role = req.user.role;
        if (!role) {
            res.status(403).json({ message: "No role specified" });
            return;
        }
        const allowedPermissions = permissions_1.PERMISSIONS[role];
        if (allowedPermissions.includes(permission)) {
            next();
        }
        else {
            res.status(403).json({ message: "unauthorized access" });
        }
    };
};
exports.hasPermission = hasPermission;
