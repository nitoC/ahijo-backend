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
const zod_1 = require("zod");
const User_1 = require("../repositories/User");
const customErrors_1 = require("../errors/customErrors");
const user = require("../models/User.js");
const bcrypt = require("bcryptjs");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
                throw new customErrors_1.ConflictError("There is an account with this email");
            }
            let salt = yield bcrypt.genSalt(10);
            let passwordHash = yield bcrypt.hash(password, salt);
            let newCustomer = yield (0, User_1.addUser)(email, passwordHash);
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
            throw new customErrors_1.BadRequestError("invalid request parameter");
        }
    }
    catch (err) {
        if (err) {
            next(err);
        }
    }
});
exports.default = register;
