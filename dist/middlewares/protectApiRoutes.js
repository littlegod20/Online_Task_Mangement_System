"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectApiRoutes = void 0;
const authorization_1 = require("./authorization");
const protectApiRoutes = (req, res, next) => {
    if (req.path.startsWith("/auth")) {
        next();
        return;
    }
    (0, authorization_1.verifyToken)(req, res, next);
};
exports.protectApiRoutes = protectApiRoutes;
