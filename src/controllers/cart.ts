import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../repositories/Cart";
import { BadRequestError, BaseErrorInstance } from "../errors/customErrors";

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id, quantity, user_id, cart_id } = req.body;

    const reqObject = z.object({
      product_id: z.string().uuid(),
      quantity: z.number(),
      user_id: z.string().uuid(),
      cart_id: z.string().uuid(),
    });
    const cartValidate = reqObject.safeParse({
      product_id,
      quantity,
      user_id,
      cart_id,
    });

    if (!cartValidate.success) {
      throw new BadRequestError("Invalid parameter type");
    }
    let result = await addCartItem({ product_id, quantity, user_id, cart_id });

    res.json({ message: "success", status: 201, data: result });
  } catch (err) {
    console.log(err);
    if (err instanceof BaseErrorInstance) {
      next(err);
    }
  }
};
export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id, quantity, user_id, cart_id } = req.body;

    const reqObject = z.object({
      product_id: z.string().uuid(),
      quantity: z.number(),
      user_id: z.string().uuid(),
      cart_id: z.string().uuid(),
    });
    const cartValidate = reqObject.safeParse({
      product_id,
      quantity,
      user_id,
      cart_id,
    });

    if (!cartValidate.success) {
      throw new BadRequestError("Invalid parameter type");
    }
    let result = await updateCartItem({
      product_id,
      quantity,
      user_id,
      cart_id,
    });
    console.log(result);
    console.log(quantity, "update quantity", user_id, cart_id, product_id);
    res.json({ message: "success", status: 201, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const getAllCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.params;
    console.log(user_id, "userid cart");
    const reqObject = z.string().uuid();
    const cartValidate = reqObject.safeParse(user_id);

    if (!cartValidate.success) {
      throw new BadRequestError("Invalid parameter type or user id");
    }
    let result = await getCartItems(user_id);
    res.status(200).json({ message: "success", status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { item_id } = req.params;
    console.log(item_id, "item id");
    const reqObject = z.string().uuid();
    const cartValidate = reqObject.safeParse(item_id);

    if (!cartValidate.success) {
      throw new BadRequestError("Invalid parameter type or user id");
    }
    let result = await deleteCartItem(item_id);
    console.log(result);
    res.json({ message: "success", status: 204 });
  } catch (err) {
    console.log(err);
    res.json({ message: "Oops! an error occured", status: 500 });
  }
};
