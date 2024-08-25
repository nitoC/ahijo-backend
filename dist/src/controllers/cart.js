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
exports.removeFromCart = exports.getAllCartItems = exports.updateCart = exports.addToCart = void 0;
const zod_1 = require("zod");
const Cart_1 = require("../repositories/Cart");
const customErrors_1 = require("../errors/customErrors");
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, quantity, user_id, cart_id } = req.body;
        const reqObject = zod_1.z.object({
            product_id: zod_1.z.string().uuid(),
            quantity: zod_1.z.number(),
            user_id: zod_1.z.string().uuid(),
            cart_id: zod_1.z.string().uuid(),
        });
        const cartValidate = reqObject.safeParse({
            product_id,
            quantity,
            user_id,
            cart_id,
        });
        if (!cartValidate.success) {
            throw new customErrors_1.BadRequestError("Invalid parameter type");
        }
        let result = yield (0, Cart_1.addCartItem)({ product_id, quantity, user_id, cart_id });
        res.json({ message: "success", status: 201, data: result });
    }
    catch (err) {
        console.log(err);
        if (err instanceof customErrors_1.BaseErrorInstance) {
            next(err);
        }
    }
});
exports.addToCart = addToCart;
const updateCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, quantity, user_id, cart_id } = req.body;
        const reqObject = zod_1.z.object({
            product_id: zod_1.z.string().uuid(),
            quantity: zod_1.z.number(),
            user_id: zod_1.z.string().uuid(),
            cart_id: zod_1.z.string().uuid(),
        });
        const cartValidate = reqObject.safeParse({
            product_id,
            quantity,
            user_id,
            cart_id,
        });
        if (!cartValidate.success) {
            throw new customErrors_1.BadRequestError("Invalid parameter type");
        }
        let result = yield (0, Cart_1.updateCartItem)({
            product_id,
            quantity,
            user_id,
            cart_id,
        });
        console.log(result);
        console.log(quantity, "update quantity", user_id, cart_id, product_id);
        res.json({ message: "success", status: 201, data: result });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.updateCart = updateCart;
const getAllCartItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        console.log(user_id, "userid cart");
        const reqObject = zod_1.z.string().uuid();
        const cartValidate = reqObject.safeParse(user_id);
        if (!cartValidate.success) {
            throw new customErrors_1.BadRequestError("Invalid parameter type or user id");
        }
        let result = yield (0, Cart_1.getCartItems)(user_id);
        res.status(200).json({ message: "success", status: 200, data: result });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getAllCartItems = getAllCartItems;
const removeFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { item_id } = req.params;
        console.log(item_id, "item id");
        const reqObject = zod_1.z.string().uuid();
        const cartValidate = reqObject.safeParse(item_id);
        if (!cartValidate.success) {
            throw new customErrors_1.BadRequestError("Invalid parameter type or user id");
        }
        let result = yield (0, Cart_1.deleteCartItem)(item_id);
        console.log(result);
        res.json({ message: "success", status: 204 });
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Oops! an error occured", status: 500 });
    }
});
exports.removeFromCart = removeFromCart;
