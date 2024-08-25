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
const jwt_1 = require("../helpers/jwt");
const User_1 = require("../repositories/User");
const customErrors_1 = require("../errors/customErrors");
const user = require("../models/User.js");
const jwt = require("jsonwebtoken");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let customer;
        const reqObject = zod_1.z.object({
            email: zod_1.z.string().email().min(8),
            password: zod_1.z.string().min(8),
        });
        const { email, password } = req.body;
        const reqValid = reqObject.safeParse({ email, password });
        if (reqValid.success) {
            customer = yield (0, User_1.findUser)(email);
            console.log(customer && customer.dataValues && customer.dataValues, "custoomer");
            console.log(customer && customer.id && customer.id, "custoomer id");
            if (!customer) {
                throw new customErrors_1.NotFoundError("User not found");
            }
            let checkPassword = yield bcrypt.compare(password, customer.password);
            console.log(checkPassword, "checkpass");
            if (checkPassword) {
                let token = yield (0, jwt_1.generateTokenUser)({ data: { id: customer.id } });
                let refreshToken = yield (0, jwt_1.generateRefreshToken)({
                    data: { id: customer.id },
                });
                res.json({
                    message: "login success",
                    success: true,
                    status: 200,
                    data: {
                        id: customer.id,
                        token,
                        refreshToken,
                        cart: customer.cart,
                    },
                });
                return;
            }
            throw new customErrors_1.UnauthorizedError("wrong password");
            // console.log(customer);
        }
        else {
            throw new customErrors_1.BadRequestError("invalid entry");
        }
    }
    catch (err) {
        if (err && err instanceof customErrors_1.BaseErrorInstance) {
            console.log(err && (err === null || err === void 0 ? void 0 : err.message) ? err.message : "error");
            next(err);
        }
    }
});
module.exports = login;
