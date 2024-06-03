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
exports.authorize = void 0;
const { generateTokenUser, generateRefreshToken, verifyTokenUser, } = require("../helpers/jwt.js");
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return res
            .status(401)
            .json({ message: "You are not authorized to access this resource" });
    }
    if (token.startsWith("bearer")) {
        const decoded = yield verifyTokenUser({ token: token.split(" ")[1] });
        try {
            if (!decoded) {
                return res
                    .status(401)
                    .json({ message: "You are not authorized to access this resource" });
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            return res
                .status(401)
                .json({ message: "You are not authorized to access this resource" });
        }
    }
});
exports.authorize = authorize;
