import { ICart } from "../interfaces/Interfaces";

const CartItem = require("../models/CartItem.js");
const Cart = require("../models/Cart.js");
import Product = require("../models/Product.js");

export const addCartItem = async (data: ICart) => {
  let cart;
  try {
    const [cart, created] = await Cart.findOrCreate({
      where: { user_id: data.user_id },
    });
    console.log(cart);
    console.log(created, "created");

    if (!cart) {
      return null;
    }
    let result = await CartItem.create({
      user_id: data.user_id,
      cart_id: cart.id,
      quantity: data.quantity,
      product_id: data.product_id,
      size: data.size,
    });
    return result.id;
  } catch (err) {
    throw new Error("Oops! something went wrong while add item to cart");
  }
};
export const updateCartItem = async (data: ICart) => {
  try {
    let test = await CartItem.findOne({
      where: {
        product_id: data.product_id,
        user_id: data.user_id,
        cart_id: data.cart_id,
      },
    });
    console.log(test, "test");
    let result = await CartItem.update(
      { quantity: data.quantity },
      {
        where: {
          product_id: data.product_id,
          user_id: data.user_id,
          cart_id: data.cart_id,
        },
      }
    );

    return result;
  } catch (err) {
    throw new Error(
      "oops! something went wrong while updating cart. try again"
    );
  }
};

export const getCartItems = async (user_id: string) => {
  let cart;
  try {
    cart = await CartItem.findAll({
      where: { user_id: user_id },
      include: [{ model: Product }],
    });
    if (!cart) {
      return null;
    }

    return cart;
  } catch (err) {
    console.log(err, "cart repository");
    throw new Error("unable to fetch cart Items");
  }
};

export const deleteCartItem = async (item_id: string) => {
  let cart;
  try {
    cart = await CartItem.destroy({
      where: { id: item_id },
    });
    if (!cart) {
      return null;
    }

    return cart;
  } catch (err) {
    throw new Error("oops! something went wrong, could not delete Item");
  }
};

// export const getCart = async (user_id: string) => {
//   let cart;
//   try {
//     cart = await CartItem.findAll({
//       where: { user_id: user_id },
//       include: [{ model: Product }],
//     });
//     if (!cart) {
//       return null;
//     }
//     return cart;
//   } catch (err) {
//     console.log(err, "cart repository");
//     throw new Error("unable to fetch cart Items");
//   }
// };
