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
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() {
        this.localhost = "127.0.0.1";
        this.server = `${this.localhost}:27017`;
        this.databaseName = "task_management";
        this.connectionString = `mongodb://${this.server}/${this.databaseName}`;
        this._connect();
        // this._disconnect();
    }
    _connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(this.connectionString);
                return console.log("Database connection successful");
            }
            catch (err) {
                console.error(`Database connection failed ${err}`);
                throw err;
            }
        });
    }
}
exports.Database = Database;
