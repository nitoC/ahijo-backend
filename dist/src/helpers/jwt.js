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
exports.verifyTokenAdmin = exports.verifyTokenUser = exports.generateTokenAdmin = exports.generateRefreshToken = exports.generateTokenUser = void 0;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateTokenUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ data }) {
    return yield jwt.sign(data, process.env.JWT_SECRET_USER, {
        expiresIn: "24h",
    });
});
exports.generateTokenUser = generateTokenUser;
const generateRefreshToken = (_b) => __awaiter(void 0, [_b], void 0, function* ({ data, }) {
    return yield jwt.sign(data, process.env.JWT_SECRET_USER, {
        expiresIn: "48h",
    });
});
exports.generateRefreshToken = generateRefreshToken;
const generateTokenAdmin = (_c) => __awaiter(void 0, [_c], void 0, function* ({ data, }) {
    return yield jwt.sign(data, process.env.JWT_SECRET_ADMIN, {
        expiresIn: 60 * 24,
    });
});
exports.generateTokenAdmin = generateTokenAdmin;
const verifyTokenUser = (_d) => __awaiter(void 0, [_d], void 0, function* ({ token }) {
    return yield jwt.verify(token, process.env.JWT_SECRET_ADMIN);
});
exports.verifyTokenUser = verifyTokenUser;
const verifyTokenAdmin = (_e) => __awaiter(void 0, [_e], void 0, function* ({ token }) {
    return yield jwt.verify(token, process.env.JWT_SECRET_ADMIN);
});
exports.verifyTokenAdmin = verifyTokenAdmin;
