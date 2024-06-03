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
const crypto = require("crypto");
const user = require("../models/User.js");
const { sendMail } = require("../helpers/sendMail.js");
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const customer = yield user.findOne({ email: email });
        if (!customer) {
            return res.status(400).json({ error: "User not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err instanceof Error && (err === null || err === void 0 ? void 0 : err.message) });
    }
    const token = crypto.randomBytes(20).toString("hex");
    const link = `${req.protocol}://${req.hostname}/api/reset/${token}`;
    sendMail(link);
});
module.exports = forgotPassword;
