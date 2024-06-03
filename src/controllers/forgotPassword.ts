import { Request, Response } from "express";
const crypto = require("crypto");
const user = require("../models/User.js");
const { sendMail } = require("../helpers/sendMail.js");

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const customer = await user.findOne({ email: email });
    if (!customer) {
      return res.status(400).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err instanceof Error && err?.message });
  }

  const token = crypto.randomBytes(20).toString("hex");
  const link = `${req.protocol}://${req.hostname}/api/reset/${token}`;

  sendMail(link);
};

module.exports = forgotPassword;
