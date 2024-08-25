const bcrypt = require("bcryptjs");
import { NextFunction, Request, Response } from "express";
import { custom, z } from "zod";
import { generateRefreshToken, generateTokenUser } from "../helpers/jwt";
import { findUser } from "../repositories/User";
import {
  BadRequestError,
  BaseErrorInstance,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors";

const user = require("../models/User.js");
const jwt = require("jsonwebtoken");

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let customer;
    const reqObject = z.object({
      email: z.string().email().min(8),
      password: z.string().min(8),
    });
    const { email, password } = req.body;

    const reqValid = reqObject.safeParse({ email, password });

    if (reqValid.success) {
      customer = await findUser(email);
      console.log(
        customer && customer.dataValues && customer.dataValues,
        "custoomer"
      );
      console.log(customer && customer.id && customer.id, "custoomer id");
      if (!customer) {
        throw new NotFoundError("User not found");
      }
      let checkPassword = await bcrypt.compare(password, customer.password);
      console.log(checkPassword, "checkpass");
      if (checkPassword) {
        let token = await generateTokenUser({ data: { id: customer.id } });
        let refreshToken = await generateRefreshToken({
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

      throw new UnauthorizedError("wrong password");

      // console.log(customer);
    } else {
      throw new BadRequestError("invalid entry");
    }
  } catch (err) {
    if (err && err instanceof BaseErrorInstance) {
      console.log(err && err?.message ? err.message : "error");

      next(err);
    }
  }
};

module.exports = login;
