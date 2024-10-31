"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const databaseClass_1 = require("./services/databaseClass");
const validators_1 = require("./middlewares/validators");
const authentication_routes_1 = __importDefault(require("./routes/authentication-routes"));
const tasks_routes_1 = __importDefault(require("./routes/tasks-routes"));
const protectApiRoutes_1 = require("./middlewares/protectApiRoutes");
const port = 5000;
const app = (0, express_1.default)();
const mongodb = new databaseClass_1.Database();
mongodb._connect().then(() => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // routes for signing and logging In
    app.use("/api/auth", validators_1.passwordValidator, authentication_routes_1.default);
    // middleware for verifying token
    app.use("/api", protectApiRoutes_1.protectApiRoutes);
    app.use("/api/", tasks_routes_1.default);
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
