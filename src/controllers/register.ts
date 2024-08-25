import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { addUser } from "../repositories/User";
import { BadRequestError, ConflictError } from "../errors/customErrors";
const user = require("../models/User.js");
const bcrypt = require("bcryptjs");

const register = async (req: Request, res: Response, next: NextFunction) => {
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
        throw new ConflictError("There is an account with this email");
      }

      let salt = await bcrypt.genSalt(10);

      let passwordHash = await bcrypt.hash(password, salt);

      let newCustomer = await addUser(email, passwordHash);

      console.log(newCustomer, " user creation log");

      if (!newCustomer) return;

      res.json({
        message: "user signed up successfully",
        status: 201,
        data: customer,
      });
    } else {
      throw new BadRequestError("invalid request parameter");
    }
  } catch (err) {
    if (err) {
      next(err);
    }
  }
};

export default register;
