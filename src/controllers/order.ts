import { Request, Response } from "express";

export const createOrder = (req: Request, res: Response) => {
  try {
    const { user_id, cart_id } = req.query;

    res.json({ message: "success", status: 201 });
  } catch (err) {
    console.log(err);
  }
};
