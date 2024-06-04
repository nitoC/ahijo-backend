import { Request, Response } from "express";
const CartItem = require("../models/CartItem.js");
const Cart = require("../models/Cart.js");

export const addToCart = (req: Request, res: Response) => {
  try {
    const { productId, amount, quantity } = req.body;
  } catch (err) {
    console.log(err);
  }
};
