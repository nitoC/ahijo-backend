"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = process.env.DB;
const user = process.env.USER;
const password = process.env.PASSWORD;
console.log(password, "password");
const sequelizedDb = new sequelize_1.Sequelize(db, user, password, {
    dialect: "postgres",
    host: "localhost",
});
exports.default = sequelizedDb;
