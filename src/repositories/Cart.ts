import { ICart } from "../interfaces/Interfaces";

const CartItem = require("../models/CartItem.js");
const Cart = require("../models/Cart.js");

export const addCartItem = async (data: ICart) => {
  let cart;
  try {
    cart = await Cart.findOrCreate({ user_id: data.user_id });
    console.log(cart);

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

export const getCartItems = async (user_id: string) => {
  let cart;
  try {
    cart = await CartItem.findAll({ where: { user_id: user_id } });
    if (!cart) {
      return null;
    }

    return cart;
  } catch (err) {
    console.log(err, "cart repository");
  }
};

export const deleteCartItem = async (data: ICart) => {
  let cart;
  try {
    cart = await CartItem.destroy({
      where: { user_id: data.user_id, item_id: data.product_id },
    });
    if (!cart) {
      return null;
    }

    return cart;
  } catch (err) {
    console.log(err, "cart repository");
  }
};
