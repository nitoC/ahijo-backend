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
exports.removeFromCart = exports.getAllCartItems = exports.addToCart = void 0;
const Cart_1 = require("../repositories/Cart");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, quantity, user_id, cart_id } = req.body;
        let result = yield (0, Cart_1.addCartItem)({ product_id, quantity, user_id, cart_id });
        res.json({ message: "success", status: 201 });
    }
    catch (err) {
        console.log(err);
    }
});
exports.addToCart = addToCart;
const getAllCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        let result = yield (0, Cart_1.getCartItems)(user_id);
        res.json({ message: "success", status: 201, data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAllCartItems = getAllCartItems;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, quantity, user_id, cart_id } = req.body;
        let result = yield (0, Cart_1.deleteCartItem)({
            product_id,
            quantity,
            user_id,
            cart_id,
        });
        res.json({ message: "success", status: 204 });
    }
    catch (err) {
        console.log(err);
    }
});
exports.removeFromCart = removeFromCart;
