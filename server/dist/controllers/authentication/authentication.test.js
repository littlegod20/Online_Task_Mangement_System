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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
const user_models_1 = require("../../models/user.models");
const databaseClass_1 = require("../../services/databaseClass");
const uuid_1 = require("uuid");
let database;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    database = new databaseClass_1.Database();
    yield database._connect();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_models_1.User.deleteMany({});
}));
// afterAll(async () => {
//   await database._disconnect();
// });
describe("Authentication Controllers", () => {
    describe("POST /api/auth/signup", () => {
        const validUserData = {
            id: (0, uuid_1.v4)(),
            username: "mica",
            email: "mica@example.com",
            password: "paSsword123",
            role: "user",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        it("should create a new user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.app)
                .post("/api/auth/signup")
                .set("username", validUserData.username)
                .set("email", validUserData.email)
                .set("password", validUserData.password)
                .set("role", validUserData.role)
                .set("createdAt", validUserData.createdAt.toISOString())
                .set("updatedAt", validUserData.updatedAt.toISOString());
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.email).toBe(validUserData.email);
            expect(response.body.data.username).toBe(validUserData.username);
            expect(response.body.data.password).not.toBe(validUserData.password);
        }));
        it("should return 400 if require fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidUserData = {
                username: "testuser",
                email: "test@example.com",
            };
            const response = yield (0, supertest_1.default)(server_1.app)
                .post("/api/auth/signup")
                .send(invalidUserData);
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            // expect(response.body.msg).toBe(
            //   "Please provide the appropriate credentials."
            // );
        }));
        it("should handle duplicate email registration", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server_1.app).post("/api/auth/signup").send(validUserData);
            const response = yield (0, supertest_1.default)(server_1.app)
                .post("/api/auth/signup")
                .send(validUserData);
            expect(response.status).toBe(403);
            // expect(response.body.success).toBe(false);
        }));
    });
});
