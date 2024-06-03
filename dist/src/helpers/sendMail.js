"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer = require("nodemailer");
const sendMail = (mail) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "your email",
            pass: "your password",
        },
    });
    const mailOptions = {
        from: "your email",
        to: "your email",
        subject: "Sending Email using Node.js",
        text: mail,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
};
exports.sendMail = sendMail;
