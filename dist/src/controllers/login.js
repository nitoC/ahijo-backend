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
const bcrypt = require("bcryptjs");
const zod_1 = require("zod");
const user = require("../models/User.js");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqObject = zod_1.z.object({
            email: zod_1.z.string().email().min(8),
            password: zod_1.z.string().min(8),
        });
        const { email, password } = req.body;
        console.log(email, password);
        const reqValid = reqObject.safeParse({ email, password });
        if (reqValid.success) {
            const customer = yield user.findOne({
                where: { email },
            });
            console.log(customer, "custoomer");
            if (!customer) {
                res.json({
                    message: "no such user",
                    status: 404,
                });
                return;
            }
            let checkPassword = yield bcrypt.compare(password, customer.password);
            console.log(checkPassword, "checkpass");
            if (checkPassword) {
                res.json({
                    message: "login success",
                    success: true,
                    status: 200,
                    data: customer,
                });
                return;
            }
            res.json({
                message: "wrong password",
                success: false,
                status: 401,
            });
            // console.log(customer);
        }
        else {
            res.json({ message: "invalid entry", status: 400, success: false });
            return;
        }
    }
    catch (err) {
        if (err && err instanceof Error) {
            console.log(err && (err === null || err === void 0 ? void 0 : err.message) ? err.message : "error");
            res.status(500).json({ message: "oops! server error", status: 500 });
        }
    }
});
module.exports = login;
