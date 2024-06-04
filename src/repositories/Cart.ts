import { ICart } from "../interfaces/Interfaces";

const CartItem = require("../models/CartItem.js");
const Cart = require("../models/Cart.js");

export const addCartItem = async (data: ICart) => {
  let cart;
  try {
    let userCart = await Cart.findOne({ where: { user_id: data.user_id } });
    if (!userCart) {
      cart = await Cart.create({ user_id: data.user_id });
    }
    let result = await CartItem.create({
      user_id: data.user_id,
      cart_id: cart.id,
      quantity: data.quantity,
    });

    return result;
  } catch (err) {
    console.log(err, "cart repository");
  }
};
