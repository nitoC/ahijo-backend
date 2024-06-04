"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = void 0;
const CartItem = require("../models/CartItem.js");
const Cart = require("../models/Cart.js");
const addToCart = (req, res) => {
    try {
        const { productId, amount, quantity } = req.body;
    }
    catch (err) {
        console.log(err);
    }
};
exports.addToCart = addToCart;
