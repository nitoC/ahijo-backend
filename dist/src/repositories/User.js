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
exports.findUser = exports.addUser = void 0;
const user = require("../models/User");
const cart = require("../models/Cart");
const addUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user.create({ email, password });
        return result;
    }
    catch (err) {
        console.log(err);
        throw new Error("oops! something went wrong. Could not register user to database");
    }
});
exports.addUser = addUser;
const findUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let person = yield user.findOne({
            where: {
                email: email,
            },
            include: [{ model: cart, attributes: ["id"] }],
        });
        return person;
    }
    catch (err) {
        console.log(err);
        throw new Error("DB query Error while finding user");
    }
});
exports.findUser = findUser;
