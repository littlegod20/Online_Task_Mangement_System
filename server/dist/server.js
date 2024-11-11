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
const cors_1 = __importDefault(require("cors"));
const databaseClass_service_1 = require("./services/databaseClass.service");
const validators_1 = require("./middlewares/validators");
const authentication_routes_1 = __importDefault(require("./routes/authentication.routes"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const protectApiRoutes_1 = require("./middlewares/protectApiRoutes");
const dotenv_1 = __importDefault(require("dotenv"));
exports.app = (0, express_1.default)();
dotenv_1.default.config();
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            exports.app.use((0, cors_1.default)());
            exports.app.use(express_1.default.json());
            exports.app.use(express_1.default.urlencoded({ extended: true }));
            const mongodb = new databaseClass_service_1.Database();
            yield mongodb._connect();
            // routes for signing and logging In
            exports.app.use("/api/auth", validators_1.passwordValidator, authentication_routes_1.default);
            // middleware for verifying token
            exports.app.use(protectApiRoutes_1.protectApiRoutes);
            exports.app.use("/api/tasks", tasks_routes_1.default);
            exports.app.use("/api/user", user_routes_1.default);
            exports.app.listen(process.env.PORT, () => {
                console.log(`Server listening on port ${process.env.PORT}`);
            });
        }
        catch (error) {
            console.error("Error starting server:", error);
        }
    });
}
startServer();
