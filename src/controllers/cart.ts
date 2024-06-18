import { Request, Response } from "express";
import {
  addCartItem,
  deleteCartItem,
  getCartItems,
} from "../repositories/Cart";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { product_id, quantity, user_id, cart_id } = req.body;
    let result = await addCartItem({ product_id, quantity, user_id, cart_id });

    res.json({ message: "success", status: 201 });
  } catch (err) {
    console.log(err);
  }
};
export const getAllCartItems = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    let result = await getCartItems(user_id);

    res.json({ message: "success", status: 201, data: result });
  } catch (err) {
    console.log(err);
  }
};
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { product_id, quantity, user_id, cart_id } = req.body;
    let result = await deleteCartItem({
      product_id,
      quantity,
      user_id,
      cart_id,
    });

    res.json({ message: "success", status: 204 });
  } catch (err) {
    console.log(err);
  }
};
