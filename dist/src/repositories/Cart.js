"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItem = exports.getCartItems = exports.updateCartItem = exports.addCartItem = void 0;
const CartItem = require("../models/CartItem.js");
const Cart = require("../models/Cart.js");
const Product = require("../models/Product.js");
const addCartItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let cart;
    try {
        const [cart, created] = yield Cart.findOrCreate({
            where: { user_id: data.user_id },
        });
        console.log(cart);
        console.log(created, "created");
        if (!cart) {
            return null;
        }
        let result = yield CartItem.create({
            user_id: data.user_id,
            cart_id: cart.id,
            quantity: data.quantity,
            product_id: data.product_id,
            size: data.size,
        });
        return result.id;
    }
    catch (err) {
        throw new Error("Oops! something went wrong while add item to cart");
    }
});
exports.addCartItem = addCartItem;
const updateCartItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let test = yield CartItem.findOne({
            where: {
                product_id: data.product_id,
                user_id: data.user_id,
                cart_id: data.cart_id,
            },
        });
        console.log(test, "test");
        let result = yield CartItem.update({ quantity: data.quantity }, {
            where: {
                product_id: data.product_id,
                user_id: data.user_id,
                cart_id: data.cart_id,
            },
        });
        return result;
    }
    catch (err) {
        throw new Error("oops! something went wrong while updating cart. try again");
    }
});
exports.updateCartItem = updateCartItem;
const getCartItems = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let cart;
    try {
        cart = yield CartItem.findAll({
            where: { user_id: user_id },
            include: [{ model: Product }],
        });
        if (!cart) {
            return null;
        }
        return cart;
    }
    catch (err) {
        console.log(err, "cart repository");
        throw new Error("unable to fetch cart Items");
    }
});
exports.getCartItems = getCartItems;
const deleteCartItem = (item_id) => __awaiter(void 0, void 0, void 0, function* () {
    let cart;
    try {
        cart = yield CartItem.destroy({
            where: { id: item_id },
        });
        if (!cart) {
            return null;
        }
        return cart;
    }
    catch (err) {
        throw new Error("oops! something went wrong, could not delete Item");
    }
});
exports.deleteCartItem = deleteCartItem;
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
