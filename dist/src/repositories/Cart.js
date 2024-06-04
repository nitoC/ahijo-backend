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
exports.addCartItem = void 0;
const CartItem = require("../models/CartItem.js");
const Cart = require("../models/Cart.js");
const addCartItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let cart;
    try {
        let userCart = yield Cart.findOne({ where: { user_id: data.user_id } });
        if (!userCart) {
            cart = yield Cart.create({ user_id: data.user_id });
        }
        yield CartItem.create({ user_id: data.user_id, cart });
    }
    catch (err) {
        console.log(err, "cart repository");
    }
});
exports.addCartItem = addCartItem;
