const bcrypt = require("bcryptjs");
import { Request, Response } from "express";
import { z } from "zod";
import { generateRefreshToken, generateTokenUser } from "../helpers/jwt";
const user = require("../models/User.js");
const jwt = require("jsonwebtoken");

const login = async (req: Request, res: Response) => {
  try {
    let customer;
    const reqObject = z.object({
      email: z.string().email().min(8),
      password: z.string().min(8),
    });
    const { email, password } = req.body;
    console.log(email, password);
    const reqValid = reqObject.safeParse({ email, password });

    if (reqValid.success) {
      customer = await user.findOne({
        where: { email },
      });
      console.log(customer, "custoomer");
      if (!customer) {
        res.json({
          message: "no such user",
          status: 404,
        });
        return;
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
          data: { id: customer.id, token, refreshToken },
        });
        return;
      }

      res.json({
        message: "wrong password",
        success: false,
        status: 401,
      });

      // console.log(customer);
    } else {
      res.json({ message: "invalid entry", status: 400, success: false });
      return;
    }
  } catch (err) {
    if (err && err instanceof Error) {
      console.log(err && err?.message ? err.message : "error");

      res.status(500).json({ message: "oops! server error", status: 500 });
    }
  }
};

module.exports = login;
