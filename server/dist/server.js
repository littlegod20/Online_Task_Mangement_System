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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const databaseClass_1 = require("./services/databaseClass");
const validators_1 = require("./middlewares/validators");
const authentication_routes_1 = __importDefault(require("./routes/authentication-routes"));
const tasks_routes_1 = __importDefault(require("./routes/tasks-routes"));
const protectApiRoutes_1 = require("./middlewares/protectApiRoutes");
const port = 5000;
exports.app = (0, express_1.default)();
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mongodb = new databaseClass_1.Database();
            yield mongodb._connect();
            exports.app.use(express_1.default.json());
            exports.app.use(express_1.default.urlencoded({ extended: true }));
            // routes for signing and logging In
            exports.app.use("/api/auth", validators_1.passwordValidator, authentication_routes_1.default);
            // middleware for verifying token
            exports.app.use("/api", protectApiRoutes_1.protectApiRoutes);
            exports.app.use("/api/tasks", tasks_routes_1.default);
            exports.app.listen(port, () => {
                console.log(`Server listening on port ${port}`);
            });
        }
        catch (error) {
            console.error("Error starting server:", error);
        }
    });
}
startServer();
