const zod = require("zod");
import { Request, Response } from "express";
import { z } from "zod";
const user = require("../models/User.js");
const bcrypt = require("bcryptjs");

const register = async (req: Request, res: Response) => {
  try {
    const reqObject = z.object({
      email: z.string().email().min(8),
      password: z.string().min(8),
    });
    const { email, password } = req.body;
    console.log(email, password);
    const reqValid = reqObject.safeParse({ email, password });

    if (reqValid.success) {
      const customer = await user.findOne({
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

      let salt = await bcrypt.genSalt(10);

      let passwordHash = await bcrypt.hash(password, salt);

      let newCustomer = await user.create({ email, password: passwordHash });

      console.log(newCustomer, " user creation log");

      if (!newCustomer) return;

      res.json({
        message: "user signed up successfully",
        status: 201,
        data: customer,
      });
    } else {
      res.json({ message: "invalid entry", status: 400 });
      return;
    }
  } catch (err) {
    if (err && err instanceof Error) {
      console.log(err && err?.message ? err.message : "error");

      res
        .status(500)
        .json({ message: "oops! server error", error: err, status: 500 });
    }
  }
};

module.exports = register;
