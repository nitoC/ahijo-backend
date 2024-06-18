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
const zod = require("zod");
const zod_1 = require("zod");
const user = require("../models/User.js");
const bcrypt = require("bcryptjs");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            console.log(customer, "customer");
            //check if customer email has been used
            if (customer) {
                res.json({
                    message: "There is an account with this email",
                    status: 409,
                    data: customer,
                });
                return;
            }
            let salt = yield bcrypt.genSalt(10);
            let passwordHash = yield bcrypt.hash(password, salt);
            let newCustomer = yield user.create({ email, password: passwordHash });
            console.log(newCustomer, " user creation log");
            if (!newCustomer)
                return;
            res.json({
                message: "user signed up successfully",
                status: 201,
                data: customer,
            });
        }
        else {
            res.json({ message: "invalid entry", status: 400 });
            return;
        }
    }
    catch (err) {
        if (err && err instanceof Error) {
            console.log(err && (err === null || err === void 0 ? void 0 : err.message) ? err.message : "error");
            res
                .status(500)
                .json({ message: "oops! server error", error: err, status: 500 });
        }
    }
});
exports.default = register;
